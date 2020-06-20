provider "digitalocean" {
  token = var.do_token
}

// The project to create resources in

data "digitalocean_project" "project" {
  name = var.do_project
}

// The overall VPC

resource "digitalocean_vpc" "vpc" {
  name = "${var.do_region}-${var.do_project}-vpc"
  region = var.do_region
  description = "VPC for ${var.do_project} Ontrack installation"
}

// Database

resource "digitalocean_database_cluster" "db" {
  name = "${var.do_region}-${var.do_project}-database"
  engine = "pg"
  version = "10"
  size = var.do_database_size
  region = var.do_region
  node_count = var.do_database_count
  private_network_uuid = digitalocean_vpc.vpc.id
}

// TODO New Ontrack user for the database

// TODO New Ontrack database

// TODO Trusted to the database

// Assigns all resources to the project

resource "digitalocean_project_resources" "project-associations" {
  project = data.digitalocean_project.project.id
  resources = [
    digitalocean_database_cluster.db.urn
  ]
}
