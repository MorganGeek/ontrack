package net.nemerosa.ontrack.kdsl.spec

import java.time.LocalDateTime

data class Signature(
        val time: LocalDateTime,
        val user: String
)
