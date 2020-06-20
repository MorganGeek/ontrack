variable "ontrack_version" {
  type = string
  description = "Version of Ontrack to install"
  // TODO Change to 4 (latest)
  default = "4.0-alpha.0"
}

provider "null" {}

data "null_data_source" "db-info" {
  inputs = {
    db_host = digitalocean_database_cluster.db.private_host
    db_name = digitalocean_database_db.db-ontrack.name
    db_user = digitalocean_database_user.db-user.name
    db_password = digitalocean_database_user.db-user.password
  }
}

resource "null_resource" "ontrack-provisioning" {

  triggers = {
    // Has the source file changed?
    compose-file = filesha256("compose/docker-compose.yml")
    // Has the Ontrack version changed?
    ontrack-version = var.ontrack_version
    // Identifies the content of this resource
    version = "0.2.1"
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

  provisioner "remote-exec" {
    inline = [
      <<-EOT
      ONTRACK_VERSION=${var.ontrack_version} \
      JDBC_URL=jdbc:postgresql://${digitalocean_database_cluster.db.private_host}:${digitalocean_database_cluster.db.port}/${digitalocean_database_db.db-ontrack.name} \
      JDBC_USERNAME=${digitalocean_database_user.db-user.name} \
      JDBC_PASSWORD=${digitalocean_database_user.db-user.password} \
      docker-compose --file /var/ontrack/docker-compose.yml --project-name ontrack up -d
      EOT
    ]
  }

}