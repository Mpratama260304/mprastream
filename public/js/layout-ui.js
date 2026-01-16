/**
 * StreamFlow Layout UI JavaScript
 * Handles UI interactions: dropdowns, mobile nav, notifications, modals
 * @version 2.2.0
 */

(function() {
  'use strict';

  // ========================================
  // Profile Dropdown (Desktop)
  // ========================================
  function initProfileDropdown() {
    const profileButton = document.getElementById('profile-menu-button');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (!profileButton || !profileDropdown) return;

    profileButton.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      profileDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      const isClickInsideDropdown = profileDropdown.contains(e.target);
      const isClickOnButton = profileButton.contains(e.target);
      
      if (!isClickInsideDropdown && !isClickOnButton && !profileDropdown.classList.contains('hidden')) {
        profileDropdown.classList.add('hidden');
      }
    });

    profileDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // ========================================
  // Mobile Profile Popup
  // ========================================
  function initMobileProfile() {
    const profileBtn = document.getElementById('mobile-profile-btn');
    const profilePopup = document.getElementById('mobile-profile-popup');
    
    if (!profileBtn || !profilePopup) return;

    profileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (profilePopup.classList.contains('hidden')) {
        profilePopup.classList.remove('hidden');
        setTimeout(() => {
          profilePopup.classList.add('show');
        }, 10);
      } else {
        profilePopup.classList.remove('show');
        setTimeout(() => {
          profilePopup.classList.add('hidden');
        }, 200);
      }
    });

    document.addEventListener('click', function(e) {
      if (!profilePopup.classList.contains('hidden') &&
          !profileBtn.contains(e.target) &&
          !profilePopup.contains(e.target)) {
        profilePopup.classList.remove('show');
        setTimeout(() => {
          profilePopup.classList.add('hidden');
        }, 200);
      }
    });
  }

  // ========================================
  // Desktop Notifications
  // ========================================
  function initNotifications() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    
    if (!notificationBtn || !notificationDropdown) return;

    notificationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      hideNotificationBadge();
      
      if (notificationDropdown.classList.contains('hidden')) {
        notificationDropdown.classList.remove('hidden');
      } else {
        notificationDropdown.classList.add('hidden');
      }
    });
    
    document.addEventListener('click', function(e) {
      if (!notificationDropdown.classList.contains('hidden') &&
          !notificationBtn.contains(e.target) &&
          !notificationDropdown.contains(e.target)) {
        notificationDropdown.classList.add('hidden');
      }
    });
  }

  // ========================================
  // Mobile Notifications
  // ========================================
  function initMobileNotifications() {
    const mobileNotificationBtn = document.getElementById('mobile-notification-btn');
    const mobileNotificationPopup = document.getElementById('mobile-notification-popup');
    
    if (!mobileNotificationBtn || !mobileNotificationPopup) return;

    mobileNotificationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      hideNotificationBadge();
      
      mobileNotificationPopup.style.top = '64px';
      mobileNotificationPopup.style.right = '10px';
      mobileNotificationPopup.style.left = 'auto';
      mobileNotificationPopup.style.bottom = 'auto';
      
      if (mobileNotificationPopup.classList.contains('hidden')) {
        mobileNotificationPopup.classList.remove('hidden');
        setTimeout(() => {
          mobileNotificationPopup.classList.add('show');
        }, 10);
      } else {
        mobileNotificationPopup.classList.remove('show');
        setTimeout(() => {
          mobileNotificationPopup.classList.add('hidden');
        }, 200);
      }
    });

    document.addEventListener('click', function(e) {
      if (!mobileNotificationPopup.classList.contains('hidden') &&
          !mobileNotificationBtn.contains(e.target) &&
          !mobileNotificationPopup.contains(e.target)) {
        mobileNotificationPopup.classList.remove('show');
        setTimeout(() => {
          mobileNotificationPopup.classList.add('hidden');
        }, 200);
      }
    });
  }

  // ========================================
  // Notification Badge
  // ========================================
  function hideNotificationBadge() {
    const badge = document.querySelector('#notification-btn .bg-red-500');
    const mobileBadge = document.querySelector('#mobile-notification-btn .bg-red-500');
    
    if (badge) badge.classList.add('hidden');
    if (mobileBadge) mobileBadge.classList.add('hidden');
    
    const latestCommitSha = localStorage.getItem('latestCommitSha');
    if (latestCommitSha) {
      localStorage.setItem('savedCommitSha', latestCommitSha);
    }
  }

  function showNotificationBadge() {
    const badge = document.querySelector('#notification-btn .bg-red-500');
    const mobileBadge = document.querySelector('#mobile-notification-btn .bg-red-500');
    
    if (badge) badge.classList.remove('hidden');
    if (mobileBadge) mobileBadge.classList.remove('hidden');
  }

  function updateNotificationBadge() {
    const badge = document.querySelector('#notification-btn .bg-red-500');
    const mobileBadge = document.querySelector('#mobile-notification-btn .bg-red-500');
    const latestCommitSha = localStorage.getItem('latestCommitSha');
    const savedCommitSha = localStorage.getItem('savedCommitSha');

    if (savedCommitSha && latestCommitSha && savedCommitSha !== latestCommitSha) {
      if (badge) badge.classList.remove('hidden');
      if (mobileBadge) mobileBadge.classList.remove('hidden');
    } else {
      if (badge) badge.classList.add('hidden');
      if (mobileBadge) mobileBadge.classList.add('hidden');
    }
  }

  // ========================================
  // GitHub Updates / Notifications
  // ========================================
  async function checkGitHubUpdates() {
    try {
      const response = await fetch('https://api.github.com/repos/mpratama/streamflow/commits?per_page=3');
      if (!response.ok) return;
      
      const commits = await response.json();
      
      if (commits && commits.length > 0) {
        const latestCommitSha = commits[0].sha;
        const savedCommitSha = localStorage.getItem('savedCommitSha');
        
        localStorage.setItem('latestCommitSha', latestCommitSha);
        
        showGitHubUpdateNotifications(commits);
        
        if (!savedCommitSha) {
          localStorage.setItem('savedCommitSha', latestCommitSha);
        } else if (savedCommitSha !== latestCommitSha) {
          showNotificationBadge();
        } else {
          const badge = document.querySelector('#notification-btn .bg-red-500');
          const mobileBadge = document.querySelector('#mobile-notification-btn .bg-red-500');
          if (badge) badge.classList.add('hidden');
          if (mobileBadge) mobileBadge.classList.add('hidden');
        }
      }
    } catch (error) {
      // Silent fail
    }
  }

  function showGitHubUpdateNotifications(commits) {
    const notificationList = document.getElementById('notification-list');
    const mobileNotificationList = document.getElementById('mobile-notification-list');
    
    if (notificationList) {
      const existingNotifications = notificationList.querySelectorAll('[data-github-notification]');
      existingNotifications.forEach(notification => notification.remove());
    }
    if (mobileNotificationList) {
      const existingNotifications = mobileNotificationList.querySelectorAll('[data-github-notification]');
      existingNotifications.forEach(notification => notification.remove());
    }
    
    commits.forEach(commit => {
      const timeAgo = getTimeAgo(commit.commit.author.date);
      const commitMessage = commit.commit.message.split('\n')[0];
      const authorName = commit.commit.author.name;
      
      const notificationHTML = `
        <div class="p-3 hover:bg-purple-500/10 transition-colors cursor-pointer" data-github-notification onclick="window.open('${commit.html_url}', '_blank')">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 flex-shrink-0">
              <img src="${commit.author?.avatar_url || '/images/default-avatar.jpg'}" alt="${authorName}" class="w-8 h-8 rounded-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-white mb-1">New GitHub Commit</h4>
              <p class="text-xs text-gray-300 mb-1">${commitMessage}</p>
              <p class="text-xs text-gray-400">by ${authorName} • ${timeAgo}</p>
            </div>
          </div>
        </div>
      `;
      
      if (notificationList) {
        notificationList.insertAdjacentHTML('beforeend', notificationHTML);
      }
      if (mobileNotificationList) {
        mobileNotificationList.insertAdjacentHTML('beforeend', notificationHTML);
      }
    });
    
    updateNotificationBadge();
  }

  function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    }
  }

  function loadNotifications() {
    checkGitHubUpdates();
  }

  // ========================================
  // Server Time Display
  // ========================================
  let serverTimeOffset = 0;
  let serverTimeInterval = null;

  async function initServerTime() {
    try {
      const response = await fetch('/api/server-time');
      if (!response.ok) return;
      
      const data = await response.json();
      const serverTime = new Date(data.serverTime);
      const clientTime = new Date();
      serverTimeOffset = serverTime.getTime() - clientTime.getTime();
      
      updateServerTimeDisplay();
      
      if (serverTimeInterval) clearInterval(serverTimeInterval);
      serverTimeInterval = setInterval(updateServerTimeDisplay, 1000);
      
      // Sync every 5 minutes
      setInterval(syncServerTime, 5 * 60 * 1000);
    } catch (error) {
      // Silent fail
    }
  }

  async function syncServerTime() {
    try {
      const response = await fetch('/api/server-time');
      if (!response.ok) return;
      
      const data = await response.json();
      const serverTime = new Date(data.serverTime);
      const clientTime = new Date();
      serverTimeOffset = serverTime.getTime() - clientTime.getTime();
    } catch (error) {
      // Silent fail
    }
  }

  function updateServerTimeDisplay() {
    const now = new Date(Date.now() + serverTimeOffset);
    
    const day = String(now.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const dateStr = `${day} ${month} ${year}`;
    const timeStr = `${hours}:${minutes}:${seconds}`;
    
    const dateEl = document.getElementById('server-date');
    const clockEl = document.getElementById('server-clock');
    const mobileDateEl = document.getElementById('mobile-server-date');
    const mobileClockEl = document.getElementById('mobile-server-clock');
    
    if (dateEl) dateEl.textContent = dateStr;
    if (clockEl) clockEl.textContent = timeStr;
    if (mobileDateEl) mobileDateEl.textContent = dateStr;
    if (mobileClockEl) mobileClockEl.textContent = timeStr;
  }

  // ========================================
  // Update Modal
  // ========================================
  function openStreamflowUpdateModal() {
    const modal = document.getElementById('streamflowUpdateModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeStreamflowUpdateModal() {
    const modal = document.getElementById('streamflowUpdateModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  }

  // ========================================
  // Keyboard Shortcuts
  // ========================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const updateModal = document.getElementById('streamflowUpdateModal');
      if (e.key === 'Escape' && updateModal && !updateModal.classList.contains('hidden')) {
        closeStreamflowUpdateModal();
      }
    });

    document.addEventListener('click', (e) => {
      const updateModal = document.getElementById('streamflowUpdateModal');
      if (updateModal && e.target === updateModal) { 
        closeStreamflowUpdateModal();
      }
    });
  }

  // ========================================
  // Initialize All UI Components
  // ========================================
  function init() {
    initProfileDropdown();
    initMobileProfile();
    initNotifications();
    initMobileNotifications();
    initServerTime();
    loadNotifications();
    initKeyboardShortcuts();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose functions globally for inline onclick handlers
  window.openStreamflowUpdateModal = openStreamflowUpdateModal;
  window.closeStreamflowUpdateModal = closeStreamflowUpdateModal;
  window.hideNotificationBadge = hideNotificationBadge;
  window.showNotificationBadge = showNotificationBadge;

})();
