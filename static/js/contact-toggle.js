(() => {
    const button = document.getElementById('init-contact');
    const socials = document.getElementById('contact-socials');

    if (!button || !socials) return;

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    const updateButton = (isOpen) => {
        button.setAttribute('aria-expanded', String(isOpen));

        button.innerHTML = isOpen
            ? '<i class="fas fa-terminal"></i> close_contact()'
            : '<i class="fas fa-terminal"></i> init_contact()';
    };

    button.addEventListener('click', () => {
        // Prevent overlapping animations
        if (socials.dataset.animating === 'true') return;

        const opening = socials.hidden;

        socials.dataset.animating = 'true';
        updateButton(opening);

        // Respect reduced-motion preferences
        if (prefersReducedMotion.matches) {
            socials.hidden = !opening;
            socials.classList.remove(
                'contact-opening',
                'contact-closing'
            );
            socials.dataset.animating = 'false';
            return;
        }

        if (opening) {
            // Show socials and fade them in
            socials.hidden = false;
            socials.classList.remove('contact-closing');
            socials.classList.add('contact-opening');

            const finishOpening = (event) => {
                if (event.target !== socials) return;

                socials.classList.remove('contact-opening');
                socials.dataset.animating = 'false';
                socials.removeEventListener(
                    'animationend',
                    finishOpening
                );
            };

            socials.addEventListener('animationend', finishOpening);
        } else {
            // Fade out before hiding socials
            socials.classList.remove('contact-opening');
            socials.classList.add('contact-closing');

            const finishClosing = (event) => {
                if (event.target !== socials) return;

                socials.hidden = true;
                socials.classList.remove('contact-closing');
                socials.dataset.animating = 'false';
                socials.removeEventListener(
                    'animationend',
                    finishClosing
                );
            };

            socials.addEventListener('animationend', finishClosing);
        }
    });
})();
