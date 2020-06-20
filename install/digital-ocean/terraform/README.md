Digital Ocean Ontrack Quick installation
========================================

## Local prerequites

Terraform 0.12 or higher must be available.

### SSH key

Generate a SSH key pair:

```
ssh-keygen -t rsa -f ./do-key -N ""
```

The key pair will be generated with `do-key` and `do-key.pub` names in the current directory
and will be used to connect to the Ontrack instance for its provisioning.

You can also use it to connect to your instance later on.

## Digital Ocean prerequisites

| Resource | Variable | Usage |
|---|---|---|
| API Token | `do-token` | Used to access Digital Ocean resources |
| Region | `do-region` | The Digital Ocean region where to create your project |
| Project | `do-project` | A Digital Ocean project where all the resources will be created |
| Space | `do-space` | A Digital Ocean space where Terraform state will be created |
| Space access key | `do-space-key-access` & `do-space-key-secret` | Digital Ocean Space access key |
| Domain | `do-domain>` | Domain managed by Digital Ocean | 

Example:

* API Token: all yours to generate
* Region: `ams3`
* Project: `demo-ontrack`
* Space: `"ams3-demo-ontrack-space"`
* Space access key: all yours to generate
* Domain: `yourdomain.com`

## Backend configuration

Backend configuration for the state:

`install.hcl`:
```
access_key = "<space access key>"
secret_key = "<space secret key>"
endpoint = "https://<do-region>.digitaloceanspaces.com"
region = "us-east-1" // Not used but required
bucket = "<do-space>"
key = "<do-project>/production/terraform.tfstate"
```

For example:

```
// Key: ams3-demo-ontrack-space-key
access_key = "<redacted>"
secret_key = "<redacted>"
endpoint = "https://ams3.digitaloceanspaces.com"
region = "us-east-1" // Not used but required
bucket = "ams3-demo-ontrack-space"
key = "demo-ontrack/production/terraform.tfstate"
```

Initialize the backend:

```
terraform init --backend-config=install.hcl
```

## Configuration

Variables:

`install.tfvars`:
```
// (required) Your Digital Ocean token
do_token = "<do-token>"
// (required) Your Digital Ocean project
do_project = "<do-project>"
// (required) Your Digital Ocean region
do_region = "<do-region>"
// (required) The Digital Ocean domain
do_domain = "<do-domain>"
// (required) The record to create in the domain
do_domain_record = "<do-project>" 
// (optional) Database cluster size
// do_database_size = "db-s-1vcpu-1gb"
// (optional) Number of nodes in the Digital Ocean Postgres cluster
// do_database_count = 1
// (optional) Slug of the image to use for the Ontrack droplet
// do_instance_image = "docker-18-04"
// (optional) Size of the droplet to use for the Ontrack
// do_instance_size = "s-2vcpu-4gb"
```

## Planning & applying

Plan:

```
terraform plan --var-file=install.tfvars
```

Applying:

```
terraform apply --var-file=install.tfvars
```

## Connection

To connect to the instance of Ontrack:

```
./connect.sh
```

This opens a SSH connection to the Ontrack instance using
the [SSH key](#ssh-key) generated at the beginning.

## Destroying the whole setup

To remove all components which have been created before:

```
terraform destroy --var-file=install.tfvars
``` 

⚠️ This will destroy the Ontrack database and all its data.

## Remaining actions

* [ ] Provisioning through Docker Compose
* [ ] Vault container
