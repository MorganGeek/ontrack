package net.nemerosa.ontrack.boot.search

import net.nemerosa.ontrack.graphql.AbstractQLKTITSupport
import org.junit.Test
import org.springframework.test.context.TestPropertySource
import kotlin.test.assertTrue

@TestPropertySource(
        properties = [
            "ontrack.config.search.engine=elasticsearch",
            "ontrack.config.search.index.immediate=true"
        ]
)
class SearchResultTypesGraphQLIT : AbstractQLKTITSupport() {

    @Test
    fun `Getting the list of search result types`() {
        val data = run("""{
            searchResultTypes {
                id
                name
                description
                feature { id }
            }
        }""")
        val types = data["searchResultTypes"]
        assertTrue(types.map { it["id"].asText() }.isNotEmpty())
    }

}