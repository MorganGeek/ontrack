package net.nemerosa.ontrack.extension.indicators.model

import net.nemerosa.ontrack.model.extension.Extension
import net.nemerosa.ontrack.model.structure.Project

/**
 * Computation of indicators.
 */
interface IndicatorComputer : Extension {

    /**
     * Display name of the computation
     */
    val name: String

    /**
     * Computation parallelisation
     *
     * If `true`, one job per project, if `false`, one job for all projects
     */
    val perProject: Boolean

    /**
     * Associated source
     */
    val source: IndicatorSource

    /**
     * Computing all indicators for the [project]. This includes not only the
     * values but the associated categories & types.
     *
     * Note that ALL categories
     * and types managed by this indicator computer must be provided because
     * they will be used to provision the repository of categories & types,
     * after having been associated with the [source].
     */
    fun computeIndicators(project: Project): List<IndicatorComputedValue<*, *>>

}

/**
 * The ID of an [IndicatorComputer] is its FQCN.
 */
val IndicatorComputer.id: String get() = this::class.java.name

/**
 * Category provided by an [IndicatorComputer].
 */
data class IndicatorComputedCategory(
        val id: String,
        val name: String
)

/**
 * Type provided by an [IndicatorComputer].
 */
data class IndicatorComputedType<T, C>(
        val category: IndicatorComputedCategory,
        val id: String,
        val name: String,
        val link: String,
        val valueType: IndicatorValueType<T, C>,
        val valueConfig: C
)

/**
 * Value provided by an [IndicatorComputer] for a given [type] and project.
 */
data class IndicatorComputedValue<T, C>(
        val type: IndicatorComputedType<T, C>,
        val value: T?,
        val comment: String?
)
