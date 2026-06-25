document.addEventListener('DOMContentLoaded', () => {
    const allContainer = document.getElementById('github-projects-container');
    const featuredContainer = document.getElementById('featured-projects-container');
    const featuredSection = document.getElementById('featured-section');
    const allTitle = document.getElementById('all-projects-title');
    
    if (!allContainer) return;

    const username = 'Vindhyalekhana';
    // Fetch all repositories (including forks), sort by most recently updated
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

    // Show loading state
    allContainer.innerHTML = '<div style="text-align:center; padding: 60px; grid-column: 1 / -1;"><i class="fa-solid fa-spinner fa-spin fa-3x" style="color: var(--primary-blue); margin-bottom: 24px;"></i><p style="font-size: 18px;">Fetching repositories from GitHub...</p></div>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            allContainer.innerHTML = ''; // Clear loading spinner
            
            if (repos.length === 0) {
                allContainer.innerHTML = '<p style="text-align:center; font-size: 18px; padding: 40px; grid-column: 1 / -1;">No public repositories found.</p>';
                return;
            }

            // A repo is "featured" if it has at least 1 star
            const featuredRepos = repos.filter(repo => repo.stargazers_count > 0);
            const regularRepos = repos.filter(repo => repo.stargazers_count === 0);

            if (featuredRepos.length > 0 && featuredContainer && featuredSection) {
                featuredSection.style.display = 'block';
                allTitle.textContent = 'Other Projects';
                
                featuredRepos.forEach((repo, index) => {
                    featuredContainer.appendChild(createProjectCard(repo, index, true));
                });
            }

            regularRepos.forEach((repo, index) => {
                allContainer.appendChild(createProjectCard(repo, index, false));
            });
            
            if(regularRepos.length === 0) {
                 allContainer.innerHTML = '<p style="text-align:center; font-size: 18px; padding: 40px; grid-column: 1 / -1; color: var(--text-muted);">No other projects found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching repos:', error);
            allContainer.innerHTML = '<div style="text-align:center; padding: 40px; color: #dc2626; grid-column: 1 / -1;"><i class="fa-solid fa-circle-exclamation fa-2x" style="margin-bottom: 16px;"></i><p>Failed to load repositories from GitHub. Please check the console for details.</p></div>';
        });

    function createProjectCard(repo, index, isFeatured) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Featured cards are larger and have different styling
        if (isFeatured) {
            card.style.background = 'var(--blue-light)';
            card.style.border = '1px solid rgba(37, 99, 235, 0.1)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)';
            card.style.display = 'grid';
            card.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            card.style.gap = '24px';
            card.style.alignItems = 'center';
        } else {
            card.style.background = 'var(--white)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
            card.style.border = '1px solid rgba(0,0,0,0.05)';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
        }
        
        card.style.borderRadius = '24px';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.cursor = 'pointer';
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = isFeatured ? '0 20px 40px rgba(0,0,0,0.06)' : '0 10px 30px rgba(0,0,0,0.04)';
        });

        // Open modal on card click
        card.addEventListener('click', () => {
            window.openProjectModal(repo);
        });

        let tagsHtml = '';
        if (repo.language) {
            tagsHtml += `<span class="tag" style="background: var(--white); border: 1px solid rgba(0,0,0,0.05); color: var(--black); font-weight: 600;">${repo.language}</span>`;
        }
        if (repo.topics && repo.topics.length > 0) {
            repo.topics.forEach(topic => {
                tagsHtml += `<span class="tag" style="background: rgba(0,0,0,0.03); color: var(--text-muted);">${topic}</span>`;
            });
        }

        const description = repo.description || 'No description provided for this repository.';
        const formattedDate = new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        const titleFontSize = isFeatured ? '32px' : '22px';
        const padding = isFeatured ? '40px' : '32px';

        card.innerHTML = `
            <div class="project-info" style="width: 100%; padding: ${padding}; display: flex; flex-direction: column; flex: 1; height: 100%;">
                <div style="margin-bottom: 20px;">
                    <h2 style="margin-bottom: 12px; font-size: ${titleFontSize}; font-weight: 700; word-break: break-word; color: var(--black);">
                        <i class="fa-brands fa-github" style="margin-right: 8px;"></i>${repo.name}
                    </h2>
                    <span style="font-size: 13px; color: var(--text-muted); font-weight: 500;"><i class="fa-regular fa-clock"></i> Updated: ${formattedDate}</span>
                </div>
                
                <p style="margin-bottom: 28px; font-size: 16px; line-height: 1.6; color: var(--text-dark); flex: 1;">${description}</p>
                
                <div style="display: flex; gap: 16px; margin-bottom: 24px; font-size: 14px; font-weight: 600;">
                    ${repo.stargazers_count > 0 ? `<span style="color: #f59e0b;"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                    ${repo.forks_count > 0 ? `<span style="color: var(--text-muted);"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>` : ''}
                </div>

                ${tagsHtml ? `<div class="tags" style="margin-bottom: 32px; display: flex; flex-wrap: wrap; gap: 8px;">${tagsHtml}</div>` : ''}
                
                <div style="display: flex; gap: 12px; margin-top: auto; flex-wrap: wrap;">
                    <a href="${repo.html_url}" target="_blank" onclick="event.stopPropagation();" class="${isFeatured ? 'btn btn-primary' : 'btn btn-dark'}" style="padding: 12px 24px; font-size: 15px; text-align: center; border-radius: 100px;">Source Code <i class="fa-brands fa-github"></i></a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" onclick="event.stopPropagation();" class="btn btn-outline" style="padding: 12px 24px; font-size: 15px; text-align: center; border-radius: 100px; border: 2px solid var(--black); color: var(--black);">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                </div>
            </div>
        `;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));

        return card;
    }

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalSource = document.getElementById('modal-source');
    const modalDemo = document.getElementById('modal-demo');
    const modalReadme = document.getElementById('modal-readme');

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    window.openProjectModal = function(repo) {
        if (!modal) return;

        // Populate Header
        modalTitle.textContent = repo.name;
        modalSource.href = repo.html_url;
        
        if (repo.homepage) {
            modalDemo.href = repo.homepage;
            modalDemo.style.display = 'inline-flex';
        } else {
            modalDemo.style.display = 'none';
        }

        // Tags
        let tagsHtml = '';
        if (repo.language) {
            tagsHtml += `<span class="tag" style="background: var(--white); border: 1px solid rgba(0,0,0,0.05); color: var(--black); font-weight: 600;">${repo.language}</span>`;
        }
        if (repo.topics && repo.topics.length > 0) {
            repo.topics.forEach(topic => {
                tagsHtml += `<span class="tag" style="background: rgba(0,0,0,0.03); color: var(--text-muted);">${topic}</span>`;
            });
        }
        modalTags.innerHTML = tagsHtml;

        // Show Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Fetch README as HTML
        modalReadme.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary);"></i><p style="margin-top: 16px; color: var(--text-muted);">Loading README from GitHub...</p></div>';
        
        fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`, {
            headers: {
                'Accept': 'application/vnd.github.v3.html'
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            if (html) {
                modalReadme.innerHTML = html;
            } else {
                modalReadme.innerHTML = `
                    <div style="text-align: center; padding: 60px;">
                        <i class="fa-brands fa-github fa-3x" style="color: var(--gray); margin-bottom: 16px;"></i>
                        <h3 style="margin-bottom: 8px;">No README found</h3>
                        <p style="color: var(--text-muted);">This repository doesn't have a README.md file detailing its architecture or challenges.</p>
                        <p style="margin-top: 24px;">${repo.description || ''}</p>
                    </div>`;
            }
        })
        .catch(err => {
            console.error('Failed to load README', err);
            modalReadme.innerHTML = '<div style="color: #dc2626; padding: 20px;">Failed to load project details.</div>';
        });
    };
});
