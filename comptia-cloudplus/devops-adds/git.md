```
author: 51n5337 & #Dab
mission: CompTIA Cloud+ Certification
brief: Git CLI Survival Kit. Essential commands for common scenarios.
```

---

[...back to 5-devops](../vocabs/5-devops.md)
# Git CLI Survival Kit: From Zero to Flow 🎒🔥

> *"Git doesn't have to be a mystical art. It's just a really powerful time machine for your code. Here's how to drive it."*

This isn't every Git command. This is the **essential 20% you'll use 80% of the time**. The commands that turn panic into power when things get weird.

## **The Absolute Basics: Your Daily Drivers** 🚗

These are the commands you'll use in almost every coding session.

### **Scenario: You just started working on a new feature.**

```bash
# See what's changed since your last commit
git status

# See exactly what lines changed in your files
git diff

# Add specific files to the "staging area" (get them ready to commit)
git add filename.py
git add src/components/   # Or add a whole folder

# Or, add EVERYTHING that's changed (use with caution!)
git add .

# Commit your changes with a clear message
git commit -m "Add new espresso recipe validation"

# Push your commits up to the remote repository (GitHub, GitLab, etc.)
git push origin feature/new-espresso-drinks
```

**The Vibe:** `status` is your look around. `diff` is your microscope. `add` is your packing list. `commit` is your checkpoint. `push` is your shipment.

---

## **Branching & Merging: The Parallel Timelines** 🌿➡️🌳

### **Scenario: You need to create a new feature without messing up the main code.**

```bash
# See all branches and which one you're currently on
git branch

# Create AND switch to a new branch
git checkout -b feature/seasonal-syrups

# Do your work, make commits...
git add .
git commit -m "Add pumpkin spice syrup configuration"

# Switch back to main to get latest changes
git checkout main

# Pull down the latest changes from the remote main branch
git pull origin main

# Switch back to your feature branch
git checkout feature/seasonal-syrups

# Merge the updated main branch INTO your feature branch
# This handles conflicts NOW instead of later
git merge main

# After resolving any conflicts and testing...
# Switch to main and merge your completed feature
git checkout main
git merge feature/seasonal-syrups
git push origin main
```

**The Vibe:** Branches are your parallel universes. Merging is bringing those universes together. Doing `git merge main` into your feature branch first is like doing a test run before the big merge party.

---

## **"Oh Crap" Scenarios: Git First Aid** 🚑🩹

### **Scenario 1: You committed to the wrong branch.**

```bash
# You're on main but meant to be on feature-branch
git checkout feature-branch
git cherry-pick main  # This moves JUST that commit
git checkout main
git reset --hard HEAD~1  # This removes it from main
```

### **Scenario 2: Your last commit message is garbage.**

```bash
# Change the message of your most recent commit
git commit --amend -m "Much better commit message"
```

### **Scenario 3: You want to undo uncommitted changes.**

```bash
# See what would be deleted (SAFETY FIRST)
git checkout --

# Actually undo changes in a specific file
git checkout -- filename.py

# Nuclear option: undo ALL uncommitted changes
git reset --hard HEAD
```

### **Scenario 4: You need to see the history.**

```bash
# Pretty, readable log
git log --oneline --graph -10  # Last 10 commits

# See who changed what in a file
git blame config.yaml
```

---

## **The Stellar Café Git Flow: A Real Example** ☕🔄

Let's walk through a complete feature development cycle at the café.

### **Monday: Starting the new loyalty program feature**

```bash
# Start from updated main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/loyalty-points-system

# Day's work: create new files, modify existing ones
git add models/loyalty.py templates/rewards.html
git commit -m "Implement loyalty points accrual system"
git push origin feature/loyalty-points-system
```

### **Tuesday: Continuing work after team changes**

```bash
# Get latest main changes that others might have merged
git checkout main
git pull origin main

# Bring those changes into your feature branch
git checkout feature/loyalty-points-system
git merge main  # Handle any conflicts here!

# More work...
git add .
git commit -m "Add points redemption functionality"
git push origin feature/loyalty-points-system
```

### **Wednesday: Code review and cleanup**

```bash
# Teammate found a typo in your code
git add .
git commit -m "Fix typo in points calculation"

# Squash the last two commits into one clean commit
git reset --soft HEAD~2
git commit -m "Complete loyalty points system with redemption"

# Force push to update the pull request (tell your team!)
git push --force-with-lease origin feature/loyalty-points-system
```

### **Thursday: Merge to main and cleanup**

```bash
# After PR is approved and merged on GitHub...
# Clean up your local branches

# Delete the feature branch locally
git branch -d feature/loyalty-points-system

# Delete the remote tracking branch
git push origin --delete feature/loyalty-points-system

# Update your local main
git checkout main
git pull origin main
```

---

## **#Dab's Git Wisdom** 🌿💭

> "Git is less about memorizing commands and more about understanding the mental model. You're moving between timelines, creating checkpoints, and carefully integrating parallel realities. The commands are just the incantations to make it happen."

> "Pro tip: **Read the output**. Git tells you exactly what it's doing and what you should do next. Most 'Git problems' are solved by actually reading the messages."

> "When in doubt: `git status`. When confused: `git log --oneline --graph`. When panicked: don't force push—breathe and ask for help."

**This completes your Git CLI survival training.** You're now equipped to handle 90% of daily Git scenarios with confidence.

**Back to the DevOps pipeline?** ⚙️🔁
[Yes, take me back to 5-DevOps](../vocabs/5-devops.md)

