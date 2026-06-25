document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('github-projects-container');
    if (!container) return;

    const username = 'Vindhyalekhana';
    // Fetch all repositories (including forks), sort by most recently updated
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

    // Show loading state
    container.innerHTML = '<div style="text-align:center; padding: 60px;"><i class="fa-solid fa-spinner fa-spin fa-3x" style="color: var(--primary-blue); margin-bottom: 24px;"></i><p style="font-size: 18px;">Fetching repositories from GitHub...</p></div>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            container.innerHTML = ''; // Clear loading spinner
            
            if (repos.length === 0) {
                container.innerHTML = '<p style="text-align:center; font-size: 18px; padding: 40px;">No public repositories found.</p>';
                return;
            }

            repos.forEach((repo, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                // Adjust styles since we removed the image
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                card.style.border = '1px solid var(--gray-light)';
                card.style.display = 'flex';
                card.style.flexDirection = 'column';
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Add hover effect via event listeners since we set inline styles
                card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
                card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');

                // Collect tags (language + topics)
                let tagsHtml = '';
                if (repo.language) {
                    tagsHtml += `<span class="tag" style="background: var(--blue-light); color: var(--primary-blue);">${repo.language}</span>`;
                }
                if (repo.topics && repo.topics.length > 0) {
                    repo.topics.forEach(topic => {
                        tagsHtml += `<span class="tag">${topic}</span>`;
                    });
                }

                const description = repo.description || 'No description provided for this repository.';
                
                const formattedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

                card.innerHTML = `
                    <div class="project-info" style="width: 100%; padding: 32px; display: flex; flex-direction: column; flex: 1;">
                        <div style="margin-bottom: 16px;">
                            <h2 style="margin-bottom: 8px; font-size: 22px; word-break: break-word;">
                                <i class="fa-brands fa-github" style="margin-right: 8px; color: var(--black);"></i>${repo.name}
                            </h2>
                            <span style="font-size: 12px; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> Updated: ${formattedDate}</span>
                        </div>
                        <p style="margin-bottom: 24px; font-size: 15px; flex: 1;">${description}</p>
                        
                        <div style="display: flex; gap: 16px; margin-bottom: 24px; font-size: 13px; color: var(--text-muted);">
                            ${repo.stargazers_count > 0 ? `<span><i class="fa-solid fa-star text-yellow"></i> ${repo.stargazers_count}</span>` : ''}
                            ${repo.forks_count > 0 ? `<span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>` : ''}
                            ${repo.fork ? `<span style="color: var(--primary-blue);"><i class="fa-solid fa-code-branch"></i> Forked</span>` : ''}
                        </div>

                        ${tagsHtml ? `<div class="tags" style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 8px;">${tagsHtml}</div>` : ''}
                        
                        <div style="display: flex; gap: 12px; margin-top: auto; flex-wrap: wrap;">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-dark" style="padding: 10px 16px; font-size: 14px; flex: 1; text-align: center;">Source <i class="fa-solid fa-arrow-right"></i></a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn btn-primary" style="padding: 10px 16px; font-size: 14px; flex: 1; text-align: center;">Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                        </div>
                    </div>
                `;
                
                container.appendChild(card);

                // Simple fade-in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 + (index * 100)); // Staggered delay
            });
        })
        .catch(error => {
            console.error('Error fetching repos:', error);
            container.innerHTML = '<div style="text-align:center; padding: 40px; color: #dc2626;"><i class="fa-solid fa-circle-exclamation fa-2x" style="margin-bottom: 16px;"></i><p>Failed to load repositories from GitHub. Please check the console for details.</p></div>';
        });
});
