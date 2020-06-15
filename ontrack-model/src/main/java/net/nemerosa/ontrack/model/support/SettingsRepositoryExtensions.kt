package net.nemerosa.ontrack.model.support

import org.apache.commons.lang3.EnumUtils
import kotlin.reflect.KClass
import kotlin.reflect.KProperty
import kotlin.reflect.KProperty0
import kotlin.reflect.KProperty1

/**
 * Type safe access to settings.
 */
inline fun <reified T> SettingsRepository.getString(property: KProperty1<T, String?>, defaultValue: String): String =
        getString(T::class.java, property.name, defaultValue)

/**
 * Type safe access to settings.
 */
inline fun <reified T> SettingsRepository.getPassword(
        property: KProperty1<T, String?>,
        defaultValue: String,
        noinline decryptService: (String?) -> String?
): String = getPassword(T::class.java, property.name, defaultValue, decryptService)

/**
 * Type safe setter of settings
 */
inline fun <reified T> SettingsRepository.setString(property: KProperty0<String?>) {
    setString(T::class.java, property.name, property.get())
}

/**
 * Getting an enum
 */
inline fun <reified T : Any, reified E : Enum<E>> SettingsRepository.getEnum(property: KProperty1<T, E>, defaultValue: E): E =
        getEnum(T::class, E::class, property, defaultValue)

/**
 * Getting an enum
 */
fun <T : Any, E : Enum<E>> SettingsRepository.getEnum(category: KClass<T>, type: KClass<E>, property: KProperty<E>, defaultValue: E): E {
    val text = getString(category.java, property.name, null)
    return if (text.isNullOrBlank()) {
        defaultValue
    } else {
        EnumUtils.getEnum(type.java, text, defaultValue)
    }
}

/**
 * Saving an enum
 */
inline fun <reified T : Any, reified E : Enum<E>> SettingsRepository.setEnum(property: KProperty0<E>) =
        setEnum(T::class, property)

fun <T : Any, E : Enum<E>> SettingsRepository.setEnum(category: KClass<T>, property: KProperty0<E>) {
    val e = property.get()
    setString(category.java, property.name, e.name)
}