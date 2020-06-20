provider "digitalocean" {
  token = var.do_token
}

// The project to create resources in

data "digitalocean_project" "project" {
  name = var.do_project
}
