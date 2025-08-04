import React from 'react';
import ReactDOM from 'react-dom/client';
import OnboardingPopup from './OnboardingPopup';

window.showOnboarding = function (config = {}) {
  const container = document.createElement('div');
  container.id = 'onboarding-popup-root';
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  root.render(<OnboardingPopup {...config} />);
};

// defineCustomElements(window); // optional if you're using Ionic or need shadow DOM
