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

// New Ontrack user for the database

resource "digitalocean_database_user" "db-user" {
  cluster_id = digitalocean_database_cluster.db.id
  name = "ontrack"
}

// New Ontrack database

resource "digitalocean_database_db" "db-ontrack" {
  cluster_id = digitalocean_database_cluster.db.id
  name = "ontrack"
}

// TODO Trusted to the database

// Assigns all resources to the project

resource "digitalocean_project_resources" "project-associations" {
  project = data.digitalocean_project.project.id
  resources = [
    digitalocean_database_cluster.db.urn
  ]
}
