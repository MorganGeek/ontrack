Digital Ocean Ontrack Quick installation
========================================

## Digital Ocean prerequisites

| Resource | Variable | Usage |
|---|---|---|
| API Token | `do-token` | Used to access Digital Ocean resources |
| Region | `do-region` | The Digital Ocean region where to create your project |
| Project | `do-project` | A Digital Ocean project where all the resources will be created |
| Space | `do-space` | A Digital Ocean space where Terraform state will be created |
| Space access key | `do-space-key-access` & `do-space-key-secret` | Digital Ocean Space access key | 

Example:

* API Token: all yours to generate
* Region: `ams3`
* Project: `demo-ontrack`
* Space: `"ams3-demo-ontrack-space"`
* Space access key: all yours to generate

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
