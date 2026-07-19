 javafx: `package com.solarmatch.app;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.shape.Line;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;

/**
 * Solar Match - Welcome Screen in JavaFX (Cross-Platform Java)
 */
public class SolarMatchLoginApp extends Application {

    @Override
    public void start(Stage primaryStage) {
        // Main Container (Device Outline style)
        VBox mainContainer = new VBox(20);
        mainContainer.setPadding(new Insets(40, 24, 40, 24));
        mainContainer.setAlignment(Pos.CENTER);
        
        // Match the background color (#f3fbfc) and frame border (#4e8ce3)
        mainContainer.setStyle(
            "-fx-background-color: #f3fbfc;" +
            "-fx-border-color: #4e8ce3;" +
            "-fx-border-width: 6;" +
            "-fx-border-radius: 12;" +
            "-fx-background-radius: 12;"
        );

        // Header bar replica
        Pane headerBar = new Pane();
        headerBar.setMinHeight(25);
        headerBar.setStyle("-fx-background-color: #a2e0e3;");

        // App Logo Placeholder (Can be substituted with custom SVG Path or ImageView)
        Label logoPlaceholder = new Label("☀️"); 
        logoPlaceholder.setFont(Font.font("System", 64));

        // Typography settings matching Lora/Playfair Display
        Label titleLabel = new Label("SOLAR MATCH");
        titleLabel.setFont(Font.font("Georgia", 28));
        titleLabel.setStyle("-fx-font-weight: bold; -fx-text-fill: #374151; -fx-letter-spacing: 2px;");

        // Thin horizontal separator line
        Line separator = new Line(0, 0, 140, 0);
        separator.setStroke(Color.web("#374151"));
        separator.setStrokeWidth(1.5);

        // Subtitle "sign here"
        Label subtitleLabel = new Label("sign here");
        subtitleLabel.setFont(Font.font("Georgia", 14));
        subtitleLabel.setStyle("-fx-font-style: italic; -fx-text-fill: #374151;");

        // Buttons Group
        Button loginButton = new Button("log in");
        loginButton.setMaxWidth(Double.MAX_VALUE);
        loginButton.setStyle(
            "-fx-background-color: #f3fbfc;" +
            "-fx-text-fill: #374151;" +
            "-fx-border-color: #374151;" +
            "-fx-border-radius: 22;" +
            "-fx-background-radius: 22;" +
            "-fx-padding: 12 24;" +
            "-fx-font-size: 14px;" +
            "-fx-font-weight: bold;"
        );
        loginButton.setOnMouseEntered(e -> loginButton.setStyle(loginButton.getStyle() + "-fx-background-color: #ffffff;"));
        loginButton.setOnMouseExited(e -> loginButton.setStyle(loginButton.getStyle() + "-fx-background-color: #f3fbfc;"));

        Button signUpButton = new Button("sign up");
        signUpButton.setMaxWidth(Double.MAX_VALUE);
        signUpButton.setStyle(
            "-fx-background-color: #d1d5db;" +
            "-fx-text-fill: #374151;" +
            "-fx-border-color: #374151;" +
            "-fx-border-radius: 22;" +
            "-fx-background-radius: 22;" +
            "-fx-padding: 12 24;" +
            "-fx-font-size: 14px;" +
            "-fx-font-weight: bold;"
        );
        signUpButton.setOnMouseEntered(e -> signUpButton.setStyle(signUpButton.getStyle() + "-fx-background-color: #e1e5eb;"));
        signUpButton.setOnMouseExited(e -> signUpButton.setStyle(signUpButton.getStyle() + "-fx-background-color: #d1d5db;"));

        VBox buttonsContainer = new VBox(12, loginButton, signUpButton);
        buttonsContainer.setPadding(new Insets(35, 10, 10, 10));

        // Wrap everything together
        mainContainer.getChildren().addAll(logoPlaceholder, titleLabel, separator, subtitleLabel, buttonsContainer);

        // Put inside outer frame VBox to resemble our HTML mockup wrapper
        VBox wrapper = new VBox(headerBar, mainContainer);
        VBox.setVgrow(mainContainer, Priority.ALWAYS);

        Scene scene = new Scene(wrapper, 360, 640);
        primaryStage.setTitle("Solar Match Login - JavaFX");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}`,
    "android-java": `package com.solarmatch.app;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

/**
 * Solar Match - Login Controller logic for Android/Java platform.
 */
public class LoginActivity extends AppCompatActivity {

    private EditText emailInput;
    private EditText passwordInput;
    private Button loginSubmitButton;
    private Button backToWelcomeButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Initialize user interfaces from R.layout.activity_login
        emailInput = findViewById(R.id.input_email);
        passwordInput = findViewById(R.id.input_password);
        loginSubmitButton = findViewById(R.id.btn_login_submit);
        backToWelcomeButton = findViewById(R.id.btn_back_to_welcome);

        // Submit form listener
        loginSubmitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email = emailInput.getText().toString().trim();
                String password = passwordInput.getText().toString();

                if (email.isEmpty()) {
                    Toast.makeText(LoginActivity.this, 
                        "Please enter your email/username", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (password.length() < 4) {
                    Toast.makeText(LoginActivity.this, 
                        "Password must be at least 4 characters", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Simulate validation and API logging in
                Toast.makeText(LoginActivity.this, 
                    "Logging in " + email + "...", Toast.LENGTH_SHORT).show();
            }
        });

        // Return button trigger
        backToWelcomeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Close activity and return to welcome launcher
            }
        });
    }
}`,
    "android-xml": `<!-- res/layout/activity_login.xml -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="#f3fbfc"
    android:padding="24dp">

    <!-- Top decorative header mimicking cyan bar -->
    <View
        android:layout_width="match_parent"
        android:layout_height="25dp"
        android:background="#a2e0e3" />

    <!-- Back Button -->
    <Button
        android:id="@+id/btn_back_to_welcome"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="← Back"
        android:background="?android:attr/selectableItemBackground"
        android:textColor="#374151"
        android:textSize="14sp"
        android:layout_marginTop="16dp" />

    <!-- Headline title -->
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Welcome back"
        android:fontFamily="serif"
        android:textSize="24sp"
        android:textStyle="bold"
        android:textColor="#111827"
        android:layout_marginTop="20dp" />

    <!-- Email Field -->
    <EditText
        android:id="@+id/input_email"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Email or Username"
        android:inputType="textEmailAddress"
        android:background="@android:drawable/editbox_background_normal"
        android:padding="12dp"
        android:layout_marginTop="24dp" />

    <!-- Password Field -->
    <EditText
        android:id="@+id/input_password"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Password"
        android:inputType="textPassword"
        android:background="@android:drawable/editbox_background_normal"
        android:padding="12dp"
        android:layout_marginTop="16dp" />

    <!-- Submit Log In Button styled as a rounded pill -->
    <Button
        android:id="@+id/btn_login_submit"
        android:layout_width="match_parent"
        android:layout_height="54dp"
        android:text="Log In"
        android:textColor="#374151"
        android:backgroundTint="#f3fbfc"
        android:layout_marginTop="32dp" />

</LinearLayout>`,
    tokens: `# Solar Match Design Tokens for Java Stylesheets

# Colors (Hex Values)
CanvasBackground       = "#e2ded0"   # Outer desktop mock backdrop
DeviceBorder           = "#4e8ce3"   # Device frame border line
ScreenBackground       = "#f3fbfc"   # Cyan-tinted phone body
HeaderTealBar          = "#a2e0e3"   # Top bar inside border
TextDarkNeutral        = "#374151"   # Charcoal for text & outlines
SilverButtonBackground = "#d1d5db"   # Sign up button color

# Dimensions
AppBorderRadius        = "22px"      # Rounded button pill shape
FrameBorderThickness   = "6px"       # Outer mock border size

# Typography Configuration
BrandHeaderFontFamily  = "Playfair Display / Georgia / Serif"
PrimaryUIFontFamily    = "Inter / System Sans-Serif"
TechMetadataFontFamily = "JetBrains Mono / Monospace"`
  };

  return (
    <div className="bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden border border-slate-700 h-full flex flex-col" id="java-dev-guide-panel">
      {/* Tab Header Banner */}
      <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between" id="guide-banner-header">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base flex items-center gap-1.5 font-sans">
              Java Cross-Platform Guide
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Developer Helper
              </span>
            </h3>
            <p className="text-slate-400 text-xs mt-0.5 font-sans">
              Export styling and code structures instantly for Java apps
            </p>
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(codeSnippets[activeTab])}
          className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-300 hover:text-white transition duration-150 text-xs font-mono cursor-pointer"
          id="btn-copy-java-code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs list selectors */}
      <div className="flex bg-slate-900/60 p-1 border-b border-slate-800 text-xs overflow-x-auto scrollbar-thin" id="guide-tabs-container">
        {[
          { id: "javafx", label: "JavaFX App", icon: <Terminal className="w-3 h-3" /> },
          { id: "android-java", label: "Android Controller", icon: <Code className="w-3 h-3" /> },
          { id: "android-xml", label: "Android Layout XML", icon: <Code className="w-3 h-3" /> },
          { id: "tokens", label: "Design Specs (Tokens)", icon: <Palette className="w-3 h-3" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center space-x-1.5 py-2 px-3.5 rounded-lg font-medium transition duration-150 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
            id={`tab-select-${tab.id}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Code Viewer Panel */}
      <div className="p-4 flex-grow overflow-y-auto bg-slate-950 font-mono text-xs leading-relaxed text-slate-300 relative h-[450px] lg:h-[520px]" id="code-snippet-viewer">
        <pre className="whitespace-pre-wrap word-break-all select-text selection:bg-amber-500/20 font-mono">
          {codeSnippets[activeTab]}
        </pre>
      </div>

      {/* Bottom helper card footer */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between" id="guide-card-footer">
        <span className="flex items-center font-sans">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
          Ready to run on any standard JVM or Android SDK build!
        </span>
        <span className="font-mono text-slate-500">v1.0.0</span>
      </div>
    </div>
  );
}
