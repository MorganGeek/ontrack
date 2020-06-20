provider "digitalocean" {
  token = var.do_token
}

// =======================================================================================
// The project to create resources in
// =======================================================================================

data "digitalocean_project" "project" {
  name = var.do_project
}

// =======================================================================================
// The overall VPC
// =======================================================================================

resource "digitalocean_vpc" "vpc" {
  name = "${var.do_region}-${var.do_project}-vpc"
  region = var.do_region
  description = "VPC for ${var.do_project} Ontrack installation"
}

// =======================================================================================
// Database
// =======================================================================================

resource "digitalocean_database_cluster" "db" {
  name = "${var.do_region}-${var.do_project}-database"
  engine = "pg"
  version = "10"
  size = var.do_database_size
  region = var.do_region
  node_count = var.do_database_count
  private_network_uuid = digitalocean_vpc.vpc.id
}

// =======================================================================================
// New Ontrack user for the database
// =======================================================================================

resource "digitalocean_database_user" "db-user" {
  cluster_id = digitalocean_database_cluster.db.id
  name = "ontrack"
}

// =======================================================================================
// New Ontrack database
// =======================================================================================

resource "digitalocean_database_db" "db-ontrack" {
  cluster_id = digitalocean_database_cluster.db.id
  name = "ontrack"
}

// =======================================================================================
// SSH key for accessing the droplet
// =======================================================================================

resource "digitalocean_ssh_key" "instance-ssh-key" {
  name = "${var.do_region}${var.do_project}-ssh-key"
  public_key = file(var.do_ssh_key_public)
}

// =======================================================================================
// Ontrack droplet
// =======================================================================================

resource "digitalocean_droplet" "instance" {
  image = var.do_instance_image
  name = "${var.do_region}-${var.do_project}-ontrack"
  region = var.do_region
  size = var.do_instance_size
  vpc_uuid = digitalocean_vpc.vpc.id
  ssh_keys = [
    digitalocean_ssh_key.instance-ssh-key.id
  ]
}

// =======================================================================================
// TODO Trusted source to the database
// =======================================================================================

// =======================================================================================
// Certificate for the load balancer
// =======================================================================================

resource "digitalocean_certificate" "ontrack-lb-cert" {
  name = "${var.do_project}-ontrack-lb-cert"
  type = "lets_encrypt"
  domains = [
    "${var.do_domain_record}.${var.do_domain}"
  ]
}

// =======================================================================================
// Load balancer
// =======================================================================================

resource "digitalocean_loadbalancer" "ontrack-public" {
  name = "${var.do_region}-${var.do_project}-lb-ontrack"
  region = var.do_region

  redirect_http_to_https = true
  vpc_uuid = digitalocean_vpc.vpc.id

  forwarding_rule {
    entry_port = 443
    entry_protocol = "https"

    target_port = 8080
    target_protocol = "http"

    certificate_id = digitalocean_certificate.ontrack-lb-cert.id
  }

  forwarding_rule {
    entry_port = 22
    entry_protocol = "tcp"

    target_port = 22
    target_protocol = "tcp"
  }

  healthcheck {
    // Using the health endpoint
    port = 8800
    protocol = "http"
    path = "/manage/health"
  }

  droplet_ids = [
    digitalocean_droplet.instance.id
  ]
}

// =======================================================================================
// DNS record to the load balancer
// =======================================================================================

resource "digitalocean_record" "record" {
  domain = var.do_domain
  type = "A"
  name = var.do_domain_record
  value = digitalocean_loadbalancer.ontrack-public.ip
}

// =======================================================================================
// Assigns all resources to the project
// =======================================================================================

resource "digitalocean_project_resources" "project-associations" {
  project = data.digitalocean_project.project.id
  resources = [
    digitalocean_database_cluster.db.urn,
    digitalocean_droplet.instance.urn,
    digitalocean_loadbalancer.ontrack-public.urn
  ]
}
