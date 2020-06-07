package net.nemerosa.ontrack.kdsl.http

import net.nemerosa.ontrack.kdsl.spec.DSLException

class ResourceMissingLinkException(name: String) : DSLException("Link is missing: $name")
