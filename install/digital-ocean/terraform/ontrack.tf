variable "ontrack_version" {
  type = string
  description = "Version of Ontrack to install"
  // TODO Change to 4 (latest)
  default = "4.0-alpha.0"
}

provider "null" {}

resource "null_resource" "ontrack-provisioning" {

  triggers = {
    // Has the source file changed?
    compose-file = filesha256("compose/docker-compose.yml")
    // Has the Ontrack version changed?
    ontrack-version = var.ontrack_version
    // Identifies the content of this resource
    version = "0.1.0"
  }

  connection {
    host = digitalocean_droplet.instance.ipv4_address
    private_key = file(var.do_ssh_key_private)
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir -p /var/ontrack"
    ]
  }

  provisioner "file" {
    source = "compose/docker-compose.yml"
    destination = "/var/ontrack/docker-compose.yml"
  }

}