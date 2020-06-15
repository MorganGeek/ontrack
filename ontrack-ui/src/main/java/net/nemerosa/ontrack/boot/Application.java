package net.nemerosa.ontrack.boot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.File;

@SpringBootApplication(scanBasePackages = "net.nemerosa.ontrack")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private static ConfigurableApplicationContext context;

    /**
     * Start-up point
     *
     * @param args Arguments passed to the program, they may contain configuration variables.
     */
    public static void main(String[] args) {

        // PID file
        File pid = new File("ontrack.pid");

        // Runs the application
        SpringApplication application = new SpringApplication(Application.class);
        application.addListeners(new ApplicationPidFileWriter(pid));
        context = application.run(args);
    }

    public static void restart() {
        logger.warn("Restarting the application...");

        ApplicationArguments args = context.getBean(ApplicationArguments.class);

        Thread thread = new Thread(() -> {
            context.close();
            context = SpringApplication.run(Application.class, args.getSourceArgs());
        });

        thread.setDaemon(false);
        thread.start();
    }

}
