package net.nemerosa.ontrack.dsl;

public class PropertyNotFoundException extends DSLException {
    public PropertyNotFoundException(String type) {
        super(String.format("Property %s is not found or not editable.", type));
    }
}
