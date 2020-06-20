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

// Assigns all resources to the project

//resource "digitalocean_project_resources" "vpc-project" {
//  project = data.digitalocean_project.project.id
//  resources = [
//  ]
//}
