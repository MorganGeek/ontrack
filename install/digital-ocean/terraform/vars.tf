variable "do_token" {
  type = string
  description = "Digital Ocean connection token"
}

variable "do_ssh_key_public" {
  description = "Path to the SSH public key"
  default = "./do-key.pub"
}

variable "do_ssh_key_private" {
  description = "Path to the SSH private key"
  default = "./do-key"
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

variable "do_domain" {
  type = string
  description = "Domain managed by Digital Ocean where to apply the load balancer certificate. Certificate will be managed by Let's Encrypt automatically."
}

variable "do_domain_record" {
  type = string
  description = "Domain record (used by the load balancer)"
}