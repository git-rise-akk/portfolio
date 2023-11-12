export function toggleLetters(opt) {
    const _this = this;

    opt = Object.assign({
        hide: true,
        angle: 0,
        duration: 1000,
        delay: 70,
        useStrings: false,
        inverseOut: false,
        callback: function () {
        }
    }, opt);

    if (opt.frame.innerHTML && opt.frame.innerHTML.split('<br>')) {
        const str = opt.frame.innerHTML.split('<br>').map(function (val, i) {
            if (opt.useStrings) return '<span class="toggle-letter-wrapper"><span class="toggle-letter">' + val + '</span></span>';
            else return val.replace(/(\S)/g, '<span class="toggle-letter-wrapper ' + ((i > 0) ? ' top_fixed_' + i : '') + '"><span class="toggle-letter">$1</span></span>');
        }).join('<br>');

        opt.frame.innerHTML = str;
    }

    if (opt.hide) {
        const toggleLetterElements = opt.frame.querySelectorAll('.toggle-letter');
        toggleLetterElements.forEach(function (element) {
            element.style.opacity = 0;
            element.style.transform = 'translateY(100%)';
        });
    }

    const lettersCount = opt.frame.querySelectorAll('.toggle-letter').length;

    _this.toggle = function (show, callback = function () {}, inverse = false) {
        const toggleLetterElements = opt.frame.querySelectorAll('.toggle-letter');
        toggleLetterElements.forEach(function ($this, index) {
            const dir = inverse ? -1 : 1;

            if (show) {
                $this.style.transition = 'none';
                $this.style.transform = `translateY(${dir * 100}%) rotate(${opt.angle}deg)`;
                $this.style.opacity = 0;

                setTimeout(function () {
                    $this.style.transition = `opacity ${opt.duration}ms, transform ${opt.duration}ms`;
                    $this.style.transform = 'translateY(0) rotate(0deg)';
                    $this.style.opacity = 1;

                    if (index === lettersCount - 1 && callback) callback();
                }, index * opt.delay);

                $this.parentElement.style.overflow = 'hidden';
            } else {
                $this.style.transition = 'none';
                $this.style.transform = `translateY(${-50 * dir}%) rotate(${-opt.angle}deg)`;
                $this.style.opacity = 0;

                setTimeout(function () {
                    $this.style.transition = `opacity ${opt.duration * 0.7}ms, transform ${opt.duration * 0.7}ms`;
                    $this.style.transform = `translateY(${50 * dir}%) rotate(${-opt.angle}deg)`;
                    $this.style.opacity = 0;

                    if (index === (opt.inverseOut ? 0 : lettersCount - 1) && callback) callback();
                }, opt.inverseOut ? ((opt.delay * (lettersCount - 1)) - index * opt.delay) : (index * opt.delay));

                $this.parentElement.style.overflow = 'visible';
            }
        });
    };

    return _this;
}
