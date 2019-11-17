package net.nemerosa.ontrack.extension.sonarqube.measures

import com.nhaarman.mockitokotlin2.mock
import com.nhaarman.mockitokotlin2.whenever
import net.nemerosa.ontrack.extension.sonarqube.SonarQubeExtensionFeature
import net.nemerosa.ontrack.model.structure.Build
import net.nemerosa.ontrack.model.structure.createBranch
import net.nemerosa.ontrack.model.structure.createBuild
import net.nemerosa.ontrack.test.support.assertIs
import net.nemerosa.ontrack.test.support.assertNotPresent
import net.nemerosa.ontrack.test.support.assertPresent
import org.junit.Before
import org.junit.Test
import kotlin.test.assertEquals

class SonarQubeMeasuresInformationExtensionTest {

    private lateinit var sonarQubeMeasuresCollectionService: SonarQubeMeasuresCollectionService
    private lateinit var informationExtension: SonarQubeMeasuresInformationExtension

    @Before
    fun setup() {
        sonarQubeMeasuresCollectionService = mock()
        informationExtension = SonarQubeMeasuresInformationExtension(
                extensionFeature = SonarQubeExtensionFeature(),
                sonarQubeMeasuresCollectionService = sonarQubeMeasuresCollectionService
        )
    }

    @Test
    fun `Getting measures for a build`() {
        val build: Build = createBuild()
        whenever(sonarQubeMeasuresCollectionService.getMeasures(build)).thenReturn(
                SonarQubeMeasures(
                        mapOf(
                                "measure-1" to 12.3,
                                "measure-2" to 20.0
                        )
                )
        )
        val info = informationExtension.getInformation(build)
        assertPresent(info) {
            assertIs<SonarQubeMeasures>(it.data) { q ->
                assertEquals(
                        mapOf(
                                "measure-1" to 12.3,
                                "measure-2" to 20.0
                        ),
                        q.measures
                )
            }
        }
    }

    @Test
    fun `Not getting any measure when no measure is attached to the build`() {
        val build: Build = createBuild()
        val info = informationExtension.getInformation(build)
        assertNotPresent(info)
    }

    @Test
    fun `Not getting any measure for something different than a build`() {
        val info = informationExtension.getInformation(createBranch())
        assertNotPresent(info)
    }

}