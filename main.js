// Business Portal JavaScript Functions

// Business state management
const businessState = {
    isOnline: true,
    stats: {
        views: 247,
        messages: 18,
        unreadMessages: 2
    },
    messages: [
        { name: 'Sarah Chen', time: '2m ago', preview: 'Do you have tables available for tonight?', unread: true },
        { name: 'Mike Johnson', time: '15m ago', preview: 'What time is happy hour today?', unread: true },
        { name: 'Emma Wilson', time: '1h ago', preview: 'Thanks for the quick response!', unread: false }
    ]
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    loadBusinessState();
    
    // Update greeting every minute
    setInterval(updateGreeting, 60000);
});

// Update greeting based on time of day
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    
    if (!greetingEl) return;
    
    if (hour < 12) {
        greetingEl.textContent = 'Good morning';
    } else if (hour < 18) {
        greetingEl.textContent = 'Good afternoon';
    } else {
        greetingEl.textContent = 'Good evening';
    }
}

// Toggle business status
function toggleStatus(toggle) {
    toggle.classList.toggle('off');
    const statusMsg = document.getElementById('statusMessage');
    
    businessState.isOnline = !toggle.classList.contains('off');
    
    if (toggle.classList.contains('off')) {
        statusMsg.textContent = 'Currently offline';
        showToast('Business is now offline');
        updateBackendStatus(false);
    } else {
        statusMsg.textContent = 'Currently accepting orders';
        showToast('Business is now online');
        updateBackendStatus(true);
    }
    
    saveBusinessState();
}

// Set active navigation item
function setActiveNav(item) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    item.classList.add('active');
    
    const label = item.querySelector('.nav-label').textContent;
    const page = item.dataset.page;
    
    showToast(`Navigating to ${label}`);
    
    // Implement page navigation
    navigateToPage(page);
}

// Navigate to different pages
function navigateToPage(page) {
    console.log(`Navigating to: ${page}`);
    
    // Page routing map
    const pageMap = {
        'home': 'index.html',
        'messages': 'messages.html',
        'profile': 'profile.html',
        'settings': 'settings.html',
        'promotions': 'promotions.html',
        'photos': 'photos.html',
        'analytics': 'analytics.html',
        'reviews': 'reviews.html'
    };
    
    const targetPage = pageMap[page] || page;
    showToast(`Opening ${targetPage.replace('.html', '').toUpperCase()}`);
    
    // Uncomment to enable actual navigation
    // window.location.href = targetPage;
}

// Open individual message
function openMessage(customerName) {
    showToast(`Opening message from ${customerName}`);
    
    // Mark message as read
    const messageItem = event.currentTarget;
    if (messageItem.classList.contains('unread')) {
        messageItem.classList.remove('unread');
        businessState.stats.unreadMessages--;
        updateMessageCount();
    }
    
    // Navigate to message detail
    // navigateToPage('messages?customer=' + encodeURIComponent(customerName));
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Load business state from localStorage
function loadBusinessState() {
    const savedState = localStorage.getItem('businessState');
    
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            Object.assign(businessState, parsed);
            updateUI();
        } catch (e) {
            console.error('Error loading saved state:', e);
        }
    }
    
    // Fetch from API in production
    // fetchBusinessState();
}

// Update UI with current state
function updateUI() {
    // Update stats
    const viewsEl = document.getElementById('viewsCount');
    const messagesEl = document.getElementById('messagesCount');
    
    if (viewsEl) viewsEl.textContent = businessState.stats.views;
    if (messagesEl) messagesEl.textContent = businessState.stats.messages;
    
    // Update toggle state
    const toggle = document.getElementById('businessToggle');
    const statusMsg = document.getElementById('statusMessage');
    
    if (toggle && !businessState.isOnline) {
        toggle.classList.add('off');
        if (statusMsg) statusMsg.textContent = 'Currently offline';
    }
}

// Update message count
function updateMessageCount() {
    const messagesEl = document.getElementById('messagesCount');
    if (messagesEl) {
        messagesEl.textContent = businessState.stats.messages;
    }
    
    saveBusinessState();
}

// Save business state to localStorage
function saveBusinessState() {
    try {
        localStorage.setItem('businessState', JSON.stringify(businessState));
    } catch (e) {
        console.error('Error saving state:', e);
    }
}

// Update backend status (API placeholder)
function updateBackendStatus(isOnline) {
    console.log('Updating backend status:', isOnline);
    
    // Production API call
    /*
    fetch('/api/business/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOnline })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Status updated:', data);
    })
    .catch(error => {
        console.error('Error updating status:', error);
        showToast('Failed to update status');
    });
    */
}

// Fetch business state from API (placeholder)
function fetchBusinessState() {
    console.log('Fetching business state from API...');
    
    // Production API call
    /*
    fetch('/api/business/state')
        .then(response => response.json())
        .then(data => {
            Object.assign(businessState, data);
            updateUI();
            saveBusinessState();
        })
        .catch(error => {
            console.error('Error fetching business state:', error);
        });
    */
}

// Simulate real-time updates (for demo)
function simulateRealtimeUpdates() {
    setInterval(() => {
        // Randomly increment views
        businessState.stats.views += Math.floor(Math.random() * 5);
        updateUI();
        saveBusinessState();
    }, 30000); // Every 30 seconds
}

// Uncomment to enable simulated updates
// simulateRealtimeUpdates();

// Set active navigation based on current page
function setActiveNavByPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const navPage = item.getAttribute('onclick');
        if (navPage && navPage.includes(currentPage)) {
            item.classList.add('active');
        }
    });
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavByPage();
});
