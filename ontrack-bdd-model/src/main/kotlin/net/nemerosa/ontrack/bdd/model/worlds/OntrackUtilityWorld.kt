package net.nemerosa.ontrack.bdd.model.worlds

import net.nemerosa.ontrack.test.support.uid
import org.springframework.stereotype.Component
import java.util.concurrent.ConcurrentHashMap

@Component
class OntrackUtilityWorld {

    /**
     * Unique names
     */
    private val uniqueNames = ConcurrentHashMap<Pair<String, String>, String>()

    /**
     * Management of unique names
     */
    fun uniqueName(group: String, key: String): String =
            uniqueNames.getOrPut(group to key) {
                uid(key)
            }

    /**
     * Getting existing unique name
     */
    private fun getUniqueName(group: String, key: String) = uniqueNames.get(group to key)

    /**
     * Replacing generic unique names in a string
     */
    fun replaceTokens(input: String): String {
        val regex = "<([a-z]*):([a-zA-Z0-9]*)>".toRegex()
        return regex.replace(input) { result ->
            val group = result.groupValues[1]
            val key = result.groupValues[2]
            val value = getUniqueName(group, key)
            value ?: throw IllegalStateException("Cannot find generated unique name for $group:$key")
        }
    }

    /**
     * Clears all context
     */
    fun clear() {
        uniqueNames.clear()
    }

}