package net.nemerosa.ontrack.kdsl.spec

/**
 * Creates a project or returns it based on name, and runs some code for it.
 *
 * @param T Type of object returned by this function
 * @param name Name of the project
 * @param description Description of the project
 * @param disabled State of the project
 * @param initFn Code to run against the created project
 * @return Object return by [initFn]
 */
fun <T> Ontrack.project(
        name: String,
        description: String = "",
        disabled: Boolean = false,
        initFn: Project.() -> T
): T {
    val p = findProjectByName(name) ?: createProject(name, description, disabled)
    return p.initFn()
}

/**
 * Creates a project or returns it based on name.
 *
 * @param name Name of the project
 * @param description Description of the project
 * @param disabled State of the project
 * @return Project (created or retrieved)
 */
fun Ontrack.project(
        name: String,
        description: String = "",
        disabled: Boolean = false
): Project = project(name, description, disabled) { this }
