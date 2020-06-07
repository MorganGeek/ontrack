package net.nemerosa.ontrack.kdsl.http

import net.nemerosa.ontrack.kdsl.connector.OntrackRoot
import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector
import net.nemerosa.ontrack.kdsl.spec.Ontrack
import net.nemerosa.ontrack.kdsl.spec.Project

class HttpOntrack(ontrackConnector: OntrackConnector) : OntrackRoot(ontrackConnector), Ontrack {

    override val projects: List<Project>
        get() = TODO("Not yet implemented")

    override fun getProjects(name: String?, favoritesOnly: Boolean, propertyType: String?, propertyValue: String?): List<Project> {
        TODO("Not yet implemented")
    }

    override fun getProjectByID(id: Int): Project {
        TODO("Not yet implemented")
    }

    override fun findProjectByName(name: String): Project? {
        TODO("Not yet implemented")
    }

    override fun createProject(name: String, description: String, disabled: Boolean): Project {
        TODO("Not yet implemented")
    }

}