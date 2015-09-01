package net.nemerosa.ontrack.service.support.property;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import net.nemerosa.ontrack.model.support.ConfigurationProperty;
import net.nemerosa.ontrack.service.support.configuration.TestConfiguration;

@Data
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class TestProperty implements ConfigurationProperty<TestConfiguration> {

    private final TestConfiguration configuration;
    private final String value;

    public static TestProperty of(String value) {
        return of(
                TestConfiguration.config("test"),
                value
        );
    }

    public static TestProperty of(TestConfiguration configuration, String value) {
        return new TestProperty(
                configuration,
                value
        );
    }
}
