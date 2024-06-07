function createSkills(element, customSkills) {
    const spanCount = 5;
    const delayTime = 100;
    let text = "";
    let skillIndex = 0;
    let skillPosition = 0;
    let direction = "forward";

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomChar() {
        return String.fromCharCode(94 * Math.random() + 33);
    }

    function createFragment(count) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const span = document.createElement("span");
            span.textContent = getRandomChar();
            span.style.color = getRandomColor();
            fragment.appendChild(span);
        }
        return fragment;
    }

    function animate() {
        const currentSkill = customSkills[skillIndex];
        if (direction === "forward") {
            if (skillPosition < currentSkill.length) {
                text += currentSkill[skillPosition];
                skillPosition++;
            } else {
                direction = "backward";
            }
        } else {
            if (skillPosition > 0) {
                text = text.slice(0, -1);
                skillPosition--;
            } else {
                direction = "forward";
                skillIndex = (skillIndex + 1) % customSkills.length;
                skillPosition = 0;
                text = "";
            }
        }
        element.textContent = text;
        element.appendChild(createFragment(Math.min(spanCount, direction === "forward" ? currentSkill.length - skillPosition : skillPosition)));
        setTimeout(animate, delayTime);
    }

    animate();
}