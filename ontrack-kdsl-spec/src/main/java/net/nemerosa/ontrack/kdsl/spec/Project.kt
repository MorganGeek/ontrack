package net.nemerosa.ontrack.kdsl.spec

interface Project: ProjectEntity {

    val name: String
    val description: String
    val branches: List<Branch>

}