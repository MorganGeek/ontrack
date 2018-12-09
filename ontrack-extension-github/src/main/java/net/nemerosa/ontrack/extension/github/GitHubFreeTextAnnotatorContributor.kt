package net.nemerosa.ontrack.extension.github

import net.nemerosa.ontrack.extension.github.property.GitHubProjectConfigurationProperty
import net.nemerosa.ontrack.extension.github.property.GitHubProjectConfigurationPropertyType
import net.nemerosa.ontrack.extension.issues.IssueServiceRegistry
import net.nemerosa.ontrack.extension.issues.support.AbstractSCMPropertyIssueBasedFreeTextAnnotatorContributor
import net.nemerosa.ontrack.model.structure.PropertyService
import org.springframework.stereotype.Component

@Component
class GitHubFreeTextAnnotatorContributor(
        propertyService: PropertyService,
        issueServiceRegistry: IssueServiceRegistry
) : AbstractSCMPropertyIssueBasedFreeTextAnnotatorContributor<
        GitHubProjectConfigurationProperty,
        GitHubProjectConfigurationPropertyType
        >
(
        propertyService,
        issueServiceRegistry,
        GitHubProjectConfigurationPropertyType::class,
        { it.issueServiceConfigurationIdentifier }
)