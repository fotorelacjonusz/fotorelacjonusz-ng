[Setup]
WizardStyle=modern

AppName=Fotorelacjonusz
AppVersion="{#APP_VERSION}"
AppCopyright=Copyright (C) Sebastian Skałacki
AppPublisher=Sebastian Skałacki
AppPublisherURL=https://fotorelacjonusz.github.io
LicenseFile=InstallerInput\COPYING.txt

OutputDir=.

DefaultDirName={autopf}\Fotorelacjonusz
ArchitecturesAllowed="{#APP_ARCH}"

[Files]
Source: "InstallerInput\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{commonprograms}\Fotorelacjonusz"; Filename: "{app}\Fotorelacjonusz.exe"; WorkingDir: "{app}"; IconFilename: "{app}\icon\rounded.ico"
Name: "{commondesktop}\Fotorelacjonusz"; Filename: "{app}\Fotorelacjonusz.exe"; WorkingDir: "{app}"; IconFilename: "{app}\icon\rounded.ico"
