function setComplete(key: onboardingKey) {
    localStorage.setItem(`onboaring-${key}`, "true")
    return key
}

function checkComplete(key: onboardingKey): boolean {
    const item = localStorage.getItem(`onboaring-${key}`)
    return !!item;
}

function resetComplete() {
    for (const key in localStorage) {
        if (key.startsWith("onboaring-")) {
            localStorage.removeItem(key)
        }
    }
}

export type onboardingKey = "register" | "discover" | "details"

export {setComplete, checkComplete, resetComplete}