import 'react-native-gesture-handler/jestSetup';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Firebase
jest.mock('@react-native-firebase/app', () => ({
  firebase: {
    app: jest.fn(() => ({
      delete: jest.fn(),
    })),
  },
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    currentUser: null,
  }),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
        onSnapshot: jest.fn(),
      })),
    })),
  }),
}));

// Mock Stripe
jest.mock('@stripe/stripe-react-native', () => ({
  StripeProvider: ({ children }) => children,
  useStripe: () => ({
    confirmPayment: jest.fn(),
  }),
}));

// Mock AdMob
jest.mock('react-native-google-mobile-ads', () => ({
  __esModule: true,
  default: {
    initialize: jest.fn(),
  },
  BannerAd: 'BannerAd',
  BannerAdSize: {
    BANNER: 'BANNER',
  },
  InterstitialAd: {
    createForAdRequest: jest.fn(),
  },
  AdEventType: {
    LOADED: 'loaded',
    CLOSED: 'closed',
  },
  TestIds: {
    BANNER: 'test-banner',
    INTERSTITIAL: 'test-interstitial',
  },
}));

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');