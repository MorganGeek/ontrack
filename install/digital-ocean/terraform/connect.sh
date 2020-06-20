#!/usr/bin/env bash

INSTANCE_IP=`terraform output -no-color instance_ip`

ssh \
    -o StrictHostKeyChecking=no \
    -o NoHostAuthenticationForLocalhost=yes \
    -o UserKnownHostsFile=/dev/null \
    -i do-key \
    root@${INSTANCE_IP}
