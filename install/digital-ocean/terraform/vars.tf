variable "do_token" {
  type = string
  description = "Digital Ocean connection token"
}

variable "do_project" {
  type = string
  description = "Digital Ocean project"
}

variable "do_region" {
  type = string
  description = "Digital Ocean region where to create all the resources (example: ams3)"
}

variable "do_database_size" {
  type = string
  default = "db-s-1vcpu-1gb"
  description = "Size of the Digital Ocean Postgres cluster"
}

variable "do_database_count" {
  type = number
  default = 1
  description = "Number of nodes in the Digital Ocean Postgres cluster"
}

variable "do_instance_image" {
  type = string
  default = "docker-18-04"
  description = "Slug of the image to use for the Ontrack droplet"
}


variable "do_instance_size" {
  type = string
  default = "s-2vcpu-4gb"
  description = "Size of the droplet to use for the Ontrack"
}
