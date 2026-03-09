function openSeminarModal(date, speaker, affil, topic, abstract, link, linkText) {
    const modalCont = document.querySelector(".modal-content");
    const body = document.getElementById("modalBody");
    modalCont.className = "modal-content type-seminar";
    
    body.innerHTML = `
        <span class="close-modal" onclick="closeModal()">&times;</span>
        <div class="modal-seminar">
            <div class="modal-date-tag">${date}</div>
            <h2 class="modal-topic">${topic}</h2>
            <div class="modal-speaker-box">
                <span class="modal-label">Доповідач:</span>
                <div><strong>${speaker}</strong></div>
                <div>${affil}</div>
            </div>
            <p>${abstract}</p>
            <div style="margin-top:20px;">
                <a href="${link}" class="btn-primary" target="_blank">${linkText || 'Докладніше'}</a>
            </div>
        </div>
    `;
    showModal();
}

function openFullNewsModal(title, subtitle, content, docLink, docName, signature) {
    const modalCont = document.querySelector(".modal-content");
    const body = document.getElementById("modalBody");
    modalCont.className = "modal-content type-news";
    
    const docHtml = docLink ? `
        <div class="modal-doc-footer">
            <a href="${docLink}" target="_blank" style="text-decoration: none; color: var(--primary); font-weight: bold;">
                📄 ${docName || 'Документ'} (PDF) ↗
            </a>
        </div>` : '';

    body.innerHTML = `
        <span class="close-modal" onclick="closeModal()">&times;</span>
        <header class="modal-header-fixed">
            <h2 style="color: #fff; margin: 0;">${title}</h2>
            ${subtitle ? `<p style="opacity: 0.9; margin: 10px 0 0;"><em>${subtitle}</em></p>` : ''}
        </header>
        <div class="modal-scrollable-content">
            <div class="modal-text-body">${content}</div>
            <div class="modal-signature">${signature || ''}</div>
            ${docHtml}
        </div>
    `;
    showModal();
}

function showModal() {
    document.getElementById("newsModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("newsModal").style.display = "none";
    document.body.style.overflow = "auto";
}