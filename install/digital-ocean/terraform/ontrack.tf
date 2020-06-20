variable "ontrack_version" {
  type = string
  description = "Version of Ontrack to install"
  // TODO Change to 4 (latest)
  default = "4.0-alpha.0"
}

provider "null" {}

resource "null_resource" "ontrack-provisioning" {

  triggers = {
    version = "0.0.3"
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