package net.nemerosa.ontrack.kdsl.spec

interface Branch : ProjectEntity {

    val name: String
    val description: String
    val project: Project

}