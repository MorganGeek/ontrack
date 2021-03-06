package net.nemerosa.ontrack.extension.jira.model

data class JIRALink(
        val key: String,
        val url: String,
        val status: JIRAStatus,
        val linkName: String,
        val link: String
)
