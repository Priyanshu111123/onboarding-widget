// src/utils/tooltip.js
const OnboardingPopup = (pathname) => {
  const existingLabel = document.getElementById('route-label');
  if (existingLabel) existingLabel.remove(); // prevent duplicates

  let labelHTML = null;
  let onClickHandler = null;

  if (pathname === '/login') {
    labelHTML = '👉 Click on<br><strong>"Continue with Google"</strong>';
    onClickHandler = () => {
      const googleBtn = document.querySelector('[data-testid="google-login"]') || document.querySelector('button');
      if (googleBtn) googleBtn.click();
    };
  }

  if (pathname === '/') {
    labelHTML = `
      <div style="max-width: 500px; margin: auto; font-family: Arial, sans-serif;">
        <div style="background-color: #ea0a9fff; padding: 16px; border-radius: 8px 8px 0 0;">
          <h3 style="margin: 0;">Get Started</h3>
          <p style="margin: 4px 0;"><strong>0%</strong> Complete</p>
          <div style="width: 100%; background-color: #79005d; border-radius: 8px; height: 10px; overflow: hidden;">
            <div style="width: 0%; height: 100%; background: linear-gradient(to right, #6d0123, #ff1493);" id="progressBar"></div>
          </div>
          <p style="margin-top: 8px;">Promotes automatic calling and voice talk for the sales team.</p>
        </div>
        <div style="border-top: none; border-radius: 0 0 8px 8px; padding: 16px; background-color: #ffffff;">
          <div id="step1" style="margin-bottom: 16px; display: flex;">
            <div style="width: 16px; height: 16px; border-radius: 50%; border: 2px solid #ff69b4; margin-top: 6px; margin-right: 10px;"></div>
            <div>
              <strong>Dashboard</strong><br>
              <small>Provides statistics and performance metrics for the calls.</small>
            </div>
          </div>
          <div id="step2" style="margin-bottom: 16px; display: flex;">
            <div style="width: 16px; height: 16px; border-radius: 50%; border: 2px solid #ff69b4; margin-top: 6px; margin-right: 10px;"></div>
            <div>
              <strong>Leads</strong><br>
              <small>Provides the data about the customers like name, email and phone number at one place.</small>
            </div>
          </div>
          <div style="margin-bottom: 16px; display: flex;">
            <div style="width: 16px; height: 16px; border-radius: 50%; border: 2px solid #ff69b4; margin-top: 6px; margin-right: 10px;"></div>
            <div>
              <strong>Agent Training</strong><br>
              <small>Train your own agent for calling and customize your call preferences.</small>
            </div>
          </div>
          <div style="display: flex;">
            <div style="width: 16px; height: 16px; border-radius: 50%; border: 2px solid #ff69b4; margin-top: 6px; margin-right: 10px;"></div>
            <div>
              <strong>Integrations</strong><br>
              <small>Integrate your google calender and google chats with AI Dialer.</small>
            </div>
          </div>
        </div>
      </div>
    `;

    onClickHandler = () => {
      const getStarted = document.querySelector('button#get-started');
      if (getStarted) getStarted.click();
    };
  }

  if (!labelHTML) return;

  const label = document.createElement('div');
  label.id = 'route-label';
  label.innerHTML = labelHTML;

  Object.assign(label.style, {
    position: 'fixed',
    top: '20px',
    left: '20px',
    backgroundColor: '#fff9c4',
    color: '#333',
    padding: '0px',
    borderRadius: '10px',
    zIndex: 9999,
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '320px',
    lineHeight: '1.5',
    transition: 'opacity 0.5s ease-in-out, transform 0.2s',
    opacity: '0',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'none'
  });

  // Hover effect
  label.addEventListener('mouseenter', () => {
    label.style.transform = 'scale(1.02)';
  });
  label.addEventListener('mouseleave', () => {
    label.style.transform = 'scale(1)';
  });

  // Step-specific behavior
  label.querySelector('#step1')?.addEventListener('click', () => {
    const getStarted = document.querySelector('button#get-started');
    if (getStarted) getStarted.click();
  });

  label.querySelector('#step2')?.addEventListener('click', () => {
    window.location.href = '/about';
  });

  if (onClickHandler) {
    label.addEventListener('click', onClickHandler);
    label.setAttribute('role', 'button');
    label.setAttribute('tabIndex', '0');
  }
  const showBtn = document.createElement('button');
  showBtn.id = 'show-tooltip-btn';
  showBtn.innerText = 'Get Started';
  Object.assign(showBtn.style, {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: '#ea0a9fff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    zIndex: 9999,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  });

  // Button click shows the label
  setTimeout(() => {
    document.addEventListener('click', (e) => {
      if (!showBtn.contains(e.target)&&!label.contains(e.target) && e.target.id !== 'tooltip-restore-btn') {
  requestAnimationFrame(() => {
    label.style.opacity = '0';
label.style.pointerEvents = 'none';
    showBtn.style.display = 'block';
  });
      }
    });
  }, 10);
  showBtn.onclick = () => {
    label.style.display = 'block';
    requestAnimationFrame(() => {
      label.style.opacity = '1';
    });
label.style.pointerEvents = 'auto';
    showBtn.style.display = 'none'; // Optionally hide the button after showing the label
  };
  document.body.appendChild(showBtn);
  document.body.appendChild(label);
  requestAnimationFrame(() => {
    label.style.opacity = '1';
  });
}

export default OnboardingPopup;