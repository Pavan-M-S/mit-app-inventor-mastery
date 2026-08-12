export type BlockTone = 'control' | 'logic' | 'variable' | 'component' | 'math' | 'text'

export interface BlockRow {
  tone: BlockTone
  label: string
  /** nested rows rendered indented, e.g. the body of an "if" */
  children?: BlockRow[]
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'tip'; text: string }
  | { type: 'blocks'; title: string; rows: BlockRow[] }

export interface QuizQuestion {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  summary: string
  minutes: number
  content: ContentBlock[]
  quiz: QuizQuestion[]
}

export interface Module {
  id: string
  title: string
  subtitle: string
  /** lucide-react icon name */
  icon: string
  lessons: Lesson[]
}

const placeholder = (topic: string): ContentBlock[] => [
  {
    type: 'paragraph',
    text: `This briefing walks you through ${topic}. Work through each section, try the ideas live in the App Inventor Designer and Blocks Editor, then take the short quiz to lock in what you learned.`,
  },
  {
    type: 'tip',
    text: 'Keep the AI2 Companion running on a real device while you study — seeing changes live is the fastest way to build intuition.',
  },
]

export const curriculum: Module[] = [
  {
    id: 'm1',
    title: 'Fundamentals & Environment Setup',
    subtitle: 'Get oriented and ship your first screen',
    icon: 'Rocket',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Introduction to the Ecosystem',
        summary: 'Designer vs. Blocks Editor, and creating your account.',
        minutes: 8,
        content: [
          {
            type: 'paragraph',
            text: 'MIT App Inventor is a cloud-based visual development tool that lets you build real Android apps by dragging components and snapping together logic blocks — no typing syntax required.',
          },
          { type: 'heading', text: 'The two workspaces' },
          {
            type: 'list',
            items: [
              'Designer — where you lay out the visual side of a screen: buttons, labels, images, and non-visible components like sensors.',
              'Blocks Editor — where you define behavior: what happens when a button is clicked or a sensor changes.',
            ],
          },
          {
            type: 'paragraph',
            text: 'You switch between them with the toggle in the top-right corner. The Designer answers "what does it look like?" and the Blocks Editor answers "what does it do?".',
          },
          {
            type: 'tip',
            text: 'Sign in at ai2.appinventor.mit.edu with a Google account. Your projects live in the cloud, so you can pick up on any computer.',
          },
        ],
        quiz: [
          {
            question: 'Where do you define what happens when a button is clicked?',
            options: ['The Designer', 'The Blocks Editor', 'The Palette', 'The Viewer'],
            answer: 1,
            explanation:
              'Behavior (events and logic) lives in the Blocks Editor. The Designer only handles layout and component properties.',
          },
          {
            question: 'What is required to sign in to App Inventor?',
            options: ['An Apple ID', 'A paid license', 'A Google account', 'Android Studio'],
            answer: 2,
            explanation:
              'App Inventor runs in the browser and uses a Google account to store your projects in the cloud.',
          },
        ],
      },
      {
        id: 'm1-l2',
        title: 'Companion, Events & Basic Components',
        summary: 'Configure AI2 Companion and wire your first event.',
        minutes: 10,
        content: [
          {
            type: 'paragraph',
            text: 'The AI2 Companion app streams your project to a phone or tablet in real time. Install it from the Play Store, then use Connect → AI Companion in the browser to scan the QR code.',
          },
          {
            type: 'paragraph',
            text: 'App Inventor is event-driven: your app sits idle until something happens (a tap, a timer tick, a sensor change), and then the matching event block runs.',
          },
          {
            type: 'blocks',
            title: 'A basic click event',
            rows: [
              {
                tone: 'control',
                label: 'when Button1 · Click',
                children: [
                  { tone: 'component', label: 'set Label1 · Text to' },
                  { tone: 'text', label: '" Hello! "' },
                ],
              },
            ],
          },
          {
            type: 'tip',
            text: 'Buttons, Labels, and Images live in the "User Interface" section of the Palette. Drag them onto the Viewer to add them.',
          },
        ],
        quiz: [
          {
            question: 'What does the AI2 Companion app do?',
            options: [
              'Compiles the final APK',
              'Streams your project live to a device for testing',
              'Stores your projects in the cloud',
              'Replaces the Blocks Editor',
            ],
            answer: 1,
            explanation:
              'The Companion mirrors your in-progress app on a real device so you can test instantly without building an APK.',
          },
          {
            question: 'App Inventor programs are best described as…',
            options: ['Event-driven', 'Purely sequential', 'Compiled from Java by hand', 'Server-rendered'],
            answer: 0,
            explanation:
              'Code runs in response to events like clicks, timers, and sensor changes rather than top-to-bottom.',
          },
        ],
      },
      {
        id: 'm1-l3',
        title: 'Hello World & Media Components',
        summary: 'Your first project plus Sound, Player, and Camera.',
        minutes: 9,
        content: [
          {
            type: 'paragraph',
            text: 'Build a "Hello World" app: a Button that updates a Label, and a Sound component that plays a short clip when tapped. This ties layout, media, and events together.',
          },
          { type: 'heading', text: 'Media components' },
          {
            type: 'list',
            items: [
              'Sound — best for short effects (under ~3 seconds), low latency.',
              'Player — best for longer audio and music; it can loop and controls volume.',
              'Camera — opens the device camera and returns the captured image for you to display or store.',
            ],
          },
          {
            type: 'blocks',
            title: 'Play a sound on click',
            rows: [
              {
                tone: 'control',
                label: 'when TapButton · Click',
                children: [{ tone: 'component', label: 'call Sound1 · Play' }],
              },
            ],
          },
        ],
        quiz: [
          {
            question: 'Which component is best for a long background music track?',
            options: ['Sound', 'Player', 'Camera', 'Label'],
            answer: 1,
            explanation:
              'Player handles longer audio and supports looping and volume control; Sound is meant for short effects.',
          },
          {
            question: 'After the Camera component captures a photo, what do you typically do next?',
            options: [
              'Nothing, it saves automatically to Drive',
              'Display or store the returned image path',
              'Convert it to a Sound',
              'Restart the app',
            ],
            answer: 1,
            explanation:
              'The Camera returns the image location, which you can set as an Image’s Picture or save with TinyDB.',
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'UI Layouts & Advanced Logic',
    subtitle: 'Arrange clean interfaces and structure your code',
    icon: 'LayoutGrid',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Arrangements & Responsive Screens',
        summary: 'Horizontal/Vertical arrangements and screen sizing.',
        minutes: 9,
        content: [
          {
            type: 'paragraph',
            text: 'Arrangements are invisible containers that group components. They are the key to layouts that look intentional instead of stacked-by-accident.',
          },
          {
            type: 'list',
            items: [
              'HorizontalArrangement — places children left to right.',
              'VerticalArrangement — stacks children top to bottom.',
              'TableArrangement — a fixed grid of rows and columns.',
            ],
          },
          {
            type: 'tip',
            text: 'Set component Width/Height to "Fill parent" or "Percent" instead of fixed pixels so your UI adapts to different screen sizes.',
          },
        ],
        quiz: [
          {
            question: 'Which arrangement places components side by side?',
            options: ['VerticalArrangement', 'HorizontalArrangement', 'TinyDB', 'Canvas'],
            answer: 1,
            explanation: 'HorizontalArrangement lays its children out left to right.',
          },
          {
            question: 'What is the best Width setting for a button that should adapt to screen size?',
            options: ['Automatic pixels', 'A fixed 320px', 'Fill parent or Percent', 'Zero'],
            answer: 2,
            explanation: 'Fill parent / Percent sizing keeps layouts responsive across devices.',
          },
        ],
      },
      {
        id: 'm2-l2',
        title: 'Variables, Loops & Procedures',
        summary: 'Store values, repeat work, and build reusable functions.',
        minutes: 12,
        content: [
          {
            type: 'paragraph',
            text: 'Global variables store values that persist while the app runs. Loops repeat a set of blocks, and procedures package logic you can reuse — the block-based equivalent of a function.',
          },
          {
            type: 'blocks',
            title: 'Count from 1 to 5 with "for each"',
            rows: [
              { tone: 'variable', label: 'initialize global total to 0' },
              {
                tone: 'control',
                label: 'for each number from 1 to 5',
                children: [
                  { tone: 'variable', label: 'set global total to' },
                  { tone: 'math', label: 'total + number' },
                ],
              },
            ],
          },
          {
            type: 'tip',
            text: 'A procedure with a result returns a value (like a function); a procedure without one just performs actions. Use them to avoid copy-pasting the same blocks.',
          },
        ],
        quiz: [
          {
            question: 'What is the main benefit of a procedure?',
            options: [
              'It makes the app run offline',
              'It reuses logic without duplicating blocks',
              'It stores data permanently',
              'It connects to Bluetooth',
            ],
            answer: 1,
            explanation: 'Procedures package reusable logic so you write it once and call it many times.',
          },
          {
            question: 'Which block repeats an action a set number of times?',
            options: ['when Screen1.Initialize', 'for each number', 'set global', 'call Sound1.Play'],
            answer: 1,
            explanation: 'The "for each number from … to …" loop repeats its body across a numeric range.',
          },
        ],
      },
      {
        id: 'm2-l3',
        title: 'Lists, Dictionaries & Data',
        summary: 'Manage collections and key–value data.',
        minutes: 11,
        content: [
          {
            type: 'paragraph',
            text: 'A list holds an ordered collection of items (accessed by position). A dictionary stores key–value pairs (accessed by name). Together they model almost any data your app needs.',
          },
          {
            type: 'blocks',
            title: 'Make a list and read item 1',
            rows: [
              {
                tone: 'variable',
                label: 'initialize global fruits to',
                children: [{ tone: 'text', label: 'make a list  "apple"  "pear"  "kiwi"' }],
              },
              { tone: 'logic', label: 'select list item · list fruits · index 1  →  "apple"' },
            ],
          },
          {
            type: 'tip',
            text: 'App Inventor lists are 1-indexed: the first item is at index 1, not 0.',
          },
        ],
        quiz: [
          {
            question: 'What index refers to the first item of an App Inventor list?',
            options: ['0', '1', '-1', 'first'],
            answer: 1,
            explanation: 'App Inventor lists are 1-indexed, so the first element is at index 1.',
          },
          {
            question: 'When is a dictionary a better fit than a list?',
            options: [
              'When order by position matters most',
              'When you look items up by a named key',
              'When you only store numbers',
              'When you need to play sound',
            ],
            answer: 1,
            explanation: 'Dictionaries map keys to values, ideal for lookups by name rather than by position.',
          },
        ],
      },
    ],
  },
  {
    id: 'm3',
    title: 'Canvas, Animation & Game Mechanics',
    subtitle: 'Draw, move sprites, and detect collisions',
    icon: 'Gamepad2',
    lessons: [
      {
        id: 'm3-l1',
        title: 'The Canvas & Coordinate System',
        summary: 'Understand X/Y coordinates for drawing and motion.',
        minutes: 8,
        content: [
          {
            type: 'paragraph',
            text: 'The Canvas is a rectangular drawing surface. Its origin (0, 0) is the top-left corner: X increases to the right and Y increases downward — the opposite of a math graph.',
          },
          {
            type: 'blocks',
            title: 'Draw a dot where the user touches',
            rows: [
              {
                tone: 'control',
                label: 'when Canvas1 · Touched (x, y)',
                children: [{ tone: 'component', label: 'call Canvas1 · DrawCircle at x, y radius 15' }],
              },
            ],
          },
        ],
        quiz: [
          {
            question: 'Where is the point (0, 0) on a Canvas?',
            options: ['Center', 'Top-left corner', 'Bottom-left corner', 'Top-right corner'],
            answer: 1,
            explanation: 'Canvas coordinates start at the top-left; Y grows downward.',
          },
          {
            question: 'Increasing the Y coordinate moves an object…',
            options: ['Up', 'Down', 'Left', 'Right'],
            answer: 1,
            explanation: 'On a Canvas, larger Y values are lower on the screen.',
          },
        ],
      },
      {
        id: 'm3-l2',
        title: 'ImageSprites & Collision Detection',
        summary: 'Animate sprites and react when they touch.',
        minutes: 11,
        content: [
          {
            type: 'paragraph',
            text: 'An ImageSprite is a movable picture that lives on a Canvas. It has Speed, Heading, and Interval properties, and fires a CollidedWith event when it overlaps another sprite or the Ball.',
          },
          {
            type: 'blocks',
            title: 'Bounce off an edge',
            rows: [
              {
                tone: 'control',
                label: 'when Ball1 · EdgeReached (edge)',
                children: [{ tone: 'component', label: 'call Ball1 · Bounce edge' }],
              },
            ],
          },
          {
            type: 'tip',
            text: 'Heading is measured in degrees: 0 points right, 90 points up. Combine Heading with Speed for smooth motion.',
          },
        ],
        quiz: [
          {
            question: 'Which event fires when two sprites overlap?',
            options: ['Touched', 'CollidedWith', 'EdgeReached', 'Initialize'],
            answer: 1,
            explanation: 'CollidedWith runs when a sprite intersects another sprite or the Ball.',
          },
          {
            question: 'A sprite Heading of 90 degrees points…',
            options: ['Right', 'Up', 'Down', 'Left'],
            answer: 1,
            explanation: 'Heading 0 is right and increases counter-clockwise, so 90 points up.',
          },
        ],
      },
      {
        id: 'm3-l3',
        title: 'Build an Arcade Game with Timers',
        summary: 'Use a Clock timer to drive a Pong-style game.',
        minutes: 13,
        content: [
          {
            type: 'paragraph',
            text: 'A Clock component fires a Timer event on a fixed interval — this is your game loop. On every tick you move objects, check collisions, and update the score.',
          },
          {
            type: 'blocks',
            title: 'A simple game loop',
            rows: [
              {
                tone: 'control',
                label: 'when Clock1 · Timer',
                children: [
                  { tone: 'component', label: 'call MoveBall' },
                  {
                    tone: 'logic',
                    label: 'if  Ball touches Paddle',
                    children: [{ tone: 'variable', label: 'set global score to  score + 1' }],
                  },
                ],
              },
            ],
          },
          {
            type: 'tip',
            text: 'Set the Clock TimerInterval to about 16–33 ms for smooth ~30–60 FPS motion.',
          },
        ],
        quiz: [
          {
            question: 'What role does the Clock component play in a game?',
            options: [
              'It stores the high score',
              'It provides the repeating game loop via the Timer event',
              'It draws sprites',
              'It connects to the internet',
            ],
            answer: 1,
            explanation: 'The Clock’s Timer event fires repeatedly, acting as the game loop.',
          },
          {
            question: 'A shorter TimerInterval results in…',
            options: ['Slower, choppier motion', 'Smoother, faster updates', 'No change', 'Less battery use'],
            answer: 1,
            explanation: 'A smaller interval means more ticks per second and smoother animation (at higher CPU cost).',
          },
        ],
      },
    ],
  },
  {
    id: 'm4',
    title: 'Hardware Sensors & IoT Connectivity',
    subtitle: 'Read the physical world and talk to devices',
    icon: 'Radio',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Motion & Location Sensors',
        summary: 'Accelerometer, Gyroscope, Orientation, and GPS.',
        minutes: 10,
        content: [
          {
            type: 'paragraph',
            text: 'Sensors are non-visible components that report the physical world. The AccelerometerSensor detects shaking and tilt; the LocationSensor provides latitude, longitude, and address via GPS.',
          },
          {
            type: 'blocks',
            title: 'React to a shake',
            rows: [
              {
                tone: 'control',
                label: 'when AccelerometerSensor1 · Shaking',
                children: [{ tone: 'component', label: 'call Player1 · Vibrate 300' }],
              },
            ],
          },
          {
            type: 'tip',
            text: 'GPS needs location permission and a moment to acquire a fix. Read values inside the LocationChanged event, not immediately on start.',
          },
        ],
        quiz: [
          {
            question: 'Which sensor gives latitude and longitude?',
            options: ['AccelerometerSensor', 'LocationSensor', 'OrientationSensor', 'Clock'],
            answer: 1,
            explanation: 'The LocationSensor reports GPS coordinates and can resolve a street address.',
          },
          {
            question: 'When should you read a fresh GPS coordinate?',
            options: [
              'Immediately in Screen.Initialize',
              'Inside the LocationChanged event',
              'Only from the Designer',
              'Never, it is automatic',
            ],
            answer: 1,
            explanation: 'LocationChanged fires once a fix is available and values update.',
          },
        ],
      },
      {
        id: 'm4-l2',
        title: 'Bluetooth & IoT Microcontrollers',
        summary: 'Connect to ESP32/Arduino over Bluetooth.',
        minutes: 12,
        content: [
          {
            type: 'paragraph',
            text: 'The BluetoothClient connects your app to a paired device such as an Arduino or ESP32. You send and receive text to control hardware — LEDs, motors, sensors — from your phone.',
          },
          {
            type: 'blocks',
            title: 'Send a command to the board',
            rows: [
              {
                tone: 'control',
                label: 'when SendButton · Click',
                children: [{ tone: 'component', label: 'call BluetoothClient1 · SendText "LED_ON"' }],
              },
            ],
          },
          {
            type: 'tip',
            text: 'Pair the device in Android settings first. Then use a ListPicker populated from BluetoothClient.AddressesAndNames to choose and connect.',
          },
        ],
        quiz: [
          {
            question: 'Before an app can connect over Bluetooth Classic, the device must first be…',
            options: ['Rooted', 'Paired in Android settings', 'Flashed with iOS', 'Connected to Wi-Fi'],
            answer: 1,
            explanation: 'BluetoothClient connects to devices that are already paired at the OS level.',
          },
          {
            question: 'What do you typically exchange with an ESP32 over BluetoothClient?',
            options: ['Compiled APKs', 'Text commands and readings', 'Video streams', 'SQL queries'],
            answer: 1,
            explanation: 'You send/receive text (e.g. "LED_ON") to control and read from the microcontroller.',
          },
        ],
      },
    ],
  },
  {
    id: 'm5',
    title: 'Data Persistence & Web APIs',
    subtitle: 'Save data locally and sync with the cloud',
    icon: 'Database',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Local Storage with TinyDB',
        summary: 'Save and load data that survives app restarts.',
        minutes: 9,
        content: [
          {
            type: 'paragraph',
            text: 'TinyDB stores data on the device under tags (keys). Data persists between sessions, making it perfect for settings, high scores, and saved notes.',
          },
          {
            type: 'blocks',
            title: 'Store and retrieve a value',
            rows: [
              { tone: 'component', label: 'call TinyDB1 · StoreValue  tag "name"  value NameBox.Text' },
              { tone: 'component', label: 'set Label1.Text to  call TinyDB1 · GetValue tag "name"' },
            ],
          },
          {
            type: 'tip',
            text: 'GetValue takes a "valueIfTagNotThere" argument — supply a sensible default so first-run reads don’t return empty.',
          },
        ],
        quiz: [
          {
            question: 'What identifies a piece of data stored in TinyDB?',
            options: ['A row number', 'A tag (key)', 'A file path', 'A color'],
            answer: 1,
            explanation: 'TinyDB is a key–value store; each value is saved and read using its tag.',
          },
          {
            question: 'Why supply a "valueIfTagNotThere" default?',
            options: [
              'To speed up the app',
              'To avoid empty results on first run when the tag has no value yet',
              'It is required for Bluetooth',
              'To encrypt the data',
            ],
            answer: 1,
            explanation: 'On first run the tag is empty, so the default prevents unexpected blank values.',
          },
        ],
      },
      {
        id: 'm5-l2',
        title: 'Web Component & JSON',
        summary: 'Fetch data from APIs and parse JSON.',
        minutes: 11,
        content: [
          {
            type: 'paragraph',
            text: 'The Web component makes HTTP requests. Call Get with a URL, then read the response in the GotText event and parse it with "decode JSON" into lists and dictionaries.',
          },
          {
            type: 'blocks',
            title: 'Fetch and parse an API response',
            rows: [
              {
                tone: 'control',
                label: 'when Web1 · GotText (responseContent)',
                children: [
                  { tone: 'variable', label: 'set global data to' },
                  { tone: 'logic', label: 'call Web1 · JsonTextDecodeWithDictionaries responseContent' },
                ],
              },
            ],
          },
          {
            type: 'tip',
            text: 'Set the Web component’s Url property before calling Get. Network calls are asynchronous, so always read results inside GotText.',
          },
        ],
        quiz: [
          {
            question: 'In which event do you read an API response?',
            options: ['Screen1.Initialize', 'Web1.GotText', 'Clock1.Timer', 'Button1.Click'],
            answer: 1,
            explanation: 'The Web component delivers the response asynchronously via the GotText event.',
          },
          {
            question: 'What does "decode JSON" produce?',
            options: [
              'An image',
              'Lists and dictionaries you can read in blocks',
              'A compiled APK',
              'A sound file',
            ],
            answer: 1,
            explanation: 'Decoding JSON turns the text response into App Inventor lists/dictionaries.',
          },
        ],
      },
      {
        id: 'm5-l3',
        title: 'Cloud Sync with Firebase',
        summary: 'Live, shared data across devices.',
        minutes: 10,
        content: [
          {
            type: 'paragraph',
            text: 'FirebaseDB stores data in the cloud and pushes updates to every connected device instantly. When one user changes a value, the DataChanged event fires on all others — great for chat and multiplayer state.',
          },
          {
            type: 'blocks',
            title: 'React to a live update',
            rows: [
              {
                tone: 'control',
                label: 'when FirebaseDB1 · DataChanged (tag, value)',
                children: [{ tone: 'component', label: 'set MessagesLabel.Text to value' }],
              },
            ],
          },
          {
            type: 'tip',
            text: 'Set the FirebaseToken and FirebaseURL in the Designer. Structure your tags carefully — Firebase data is one big shared tree.',
          },
        ],
        quiz: [
          {
            question: 'Which event tells every device that shared data changed?',
            options: ['GotText', 'DataChanged', 'Timer', 'CollidedWith'],
            answer: 1,
            explanation: 'FirebaseDB.DataChanged fires on all connected clients when a value updates.',
          },
          {
            question: 'What makes Firebase different from TinyDB?',
            options: [
              'Firebase is on-device only',
              'Firebase syncs data across devices in real time',
              'Firebase cannot store text',
              'Firebase is faster offline',
            ],
            answer: 1,
            explanation: 'TinyDB is local to one device; FirebaseDB is a shared cloud database with live sync.',
          },
        ],
      },
    ],
  },
  {
    id: 'm6',
    title: 'Polishing, Packaging & Publishing',
    subtitle: 'Turn a project into a shippable app',
    icon: 'PackageCheck',
    lessons: [
      {
        id: 'm6-l1',
        title: 'App Configuration & Branding',
        summary: 'Logos, versioning, and package naming.',
        minutes: 8,
        content: [
          {
            type: 'paragraph',
            text: 'Before publishing, configure your app’s identity in Screen1 properties and Project → Settings: an app icon, a unique package name, a version number, and a version name.',
          },
          {
            type: 'list',
            items: [
              'Package name — a unique reverse-domain ID like com.yourname.myapp; it can never change after publishing.',
              'VersionCode — an integer you increase with every release.',
              'VersionName — the human-readable version users see, e.g. "1.2.0".',
              'Icon — a square PNG; App Inventor generates the launcher sizes.',
            ],
          },
        ],
        quiz: [
          {
            question: 'Which value must be unique and can never change after publishing?',
            options: ['VersionName', 'App icon', 'Package name', 'Screen title'],
            answer: 2,
            explanation: 'The package name is the app’s permanent unique identifier on Google Play.',
          },
          {
            question: 'What must you do to VersionCode for each new Play Store release?',
            options: ['Leave it the same', 'Increase it', 'Set it to 0', 'Remove it'],
            answer: 1,
            explanation: 'Google Play requires a higher VersionCode integer for every uploaded update.',
          },
        ],
      },
      {
        id: 'm6-l2',
        title: 'Custom Extensions (.aix)',
        summary: 'Add capabilities beyond built-in components.',
        minutes: 7,
        content: [
          {
            type: 'paragraph',
            text: 'Extensions are packaged .aix files that add components App Inventor doesn’t ship with — advanced UI, file tools, or hardware protocols. Import them via the "Extension" section of the Palette.',
          },
          {
            type: 'tip',
            text: 'Only import .aix files from sources you trust: an extension runs with your app’s full permissions.',
          },
          ...placeholder('finding, importing, and using community extensions'),
        ],
        quiz: [
          {
            question: 'What file type is an App Inventor extension?',
            options: ['.apk', '.aix', '.aab', '.json'],
            answer: 1,
            explanation: 'Extensions are distributed as .aix files imported through the Palette.',
          },
          {
            question: 'Why should you be careful about extension sources?',
            options: [
              'They cost money',
              'They run with your app’s full permissions',
              'They slow the Designer',
              'They only work offline',
            ],
            answer: 1,
            explanation: 'An extension has the same access as your app, so only import from trusted sources.',
          },
        ],
      },
      {
        id: 'm6-l3',
        title: 'Exporting APK & AAB for Google Play',
        summary: 'Sideload with .apk, publish with .aab.',
        minutes: 9,
        content: [
          {
            type: 'paragraph',
            text: 'When your app is ready, use Build in the top menu. Choose "App (.apk)" for direct install/sideloading and testing, or "App bundle (.aab)" — the format Google Play requires for new apps.',
          },
          {
            type: 'list',
            items: [
              '.apk — install directly on a device (enable "Install unknown apps"); great for sharing test builds.',
              '.aab — Android App Bundle; upload this to the Google Play Console for distribution.',
              'Play Console — create a listing, set content rating and privacy policy, then roll out to testing or production.',
            ],
          },
          {
            type: 'tip',
            text: 'Test the .apk thoroughly on real devices before uploading the .aab — fixing bugs is much easier before a public release.',
          },
        ],
        quiz: [
          {
            question: 'Which format does Google Play require for publishing new apps?',
            options: ['.apk', '.aab', '.aix', '.zip'],
            answer: 1,
            explanation: 'Google Play requires the Android App Bundle (.aab) for new app submissions.',
          },
          {
            question: 'What is the .apk best used for?',
            options: [
              'Uploading to the Play Store',
              'Direct install and sideloading for testing',
              'Adding extensions',
              'Storing data',
            ],
            answer: 1,
            explanation: 'An .apk installs directly on devices, ideal for sharing and testing builds.',
          },
        ],
      },
    ],
  },
]

export const allLessons: (Lesson & { moduleId: string; moduleTitle: string })[] = curriculum.flatMap(
  (m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })),
)

export const totalLessonCount = allLessons.length
