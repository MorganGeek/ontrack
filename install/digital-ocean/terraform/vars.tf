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
