const Modifier = require("./entity/modifier");
const { Move } = require("./move");
const { colors } = require("./utils");


module.exports =
{
    "Tackle": new Move("Tackle", "Deals 1.5x user's strength in damage. 0.5x user's strength in recoil.", (user, target) => {
        const strength = user.getStat("strength");
        const damage = Math.floor(strength * 1.5);
        const recoil = Math.floor(strength * 0.5);
        target.health -= damage;
        user.health -= recoil;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} tackles ${targetName} dealing ${colors.red}${damage}${colors.brightBlue} damage!\n${colors.brightBlue}However, they take ${colors.red}${recoil}${colors.brightBlue} recoil damage!${colors.reset}`);
    }, false),

    "Punch": new Move("Punch", "Deals 0.8x user's strength in damage", (user, target) => {
        const strength = user.getStat("strength");
        const damage = Math.floor(strength * 0.8);
        target.health -= damage;
        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} punches ${targetName} dealing ${colors.red}${damage}${colors.brightBlue} damage!${colors.reset}`);
    }),

    "BasicSwing": new Move("Basic Swing", "Deals the user's strength in damage", (user, target) => {
        const strength = user.getStat("strength");
        const damage = strength
        target.health -= damage;
        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} swings at ${targetName} dealing ${colors.red}${damage}${colors.brightBlue} damage!${colors.reset}`);
    }),

    "QuickAid": new Move("Quick Aid", "Heals the user's speed in health", (user, target) => {
        const speed = user.getStat("speed");
        const heal = speed;
        user.health += heal;
        user.health = Math.min(user.health, user.getStat("health"));

        const userName = colors.yellow + user.name + colors.brightBlue;
        console.log(`${userName} quickly patches themselves up, restoring ${colors.green}${heal}${colors.brightBlue} health!${colors.reset}`);
    }, true),

    "Weaken": new Move("Weaken", "Reduces the target's strength by half the user's speed for the duration of the battle. Uses 3 mana", (user, target) => {
        const modifier = new Modifier("strength", - Math.floor(user.getStat("speed") / 2));
        target.modifiers.push(modifier);
        user.mana -= 3;
        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} casts Weaken on ${targetName}, reducing their strength by ${colors.red}${-modifier.value}${colors.brightBlue}!${colors.reset}`);
    }, false, (user) => user.mana >= 3),

    "Empower": new Move("Empower", "Increases the user's strength by 2 for the duration of the battle. Uses 3 mana", (user, target) => {
        const modifier = new Modifier("strength", 2);
        user.modifiers.push(modifier);
        user.mana -= 3;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} casts Empower, increasing their strength by ${colors.green}2${colors.brightBlue}!${colors.reset}`);
    }, true, (user) => user.mana >= 3),

    "RagingStrike": new Move("Raging Strike", "Deals double the user's strength in damage but lowers their strength by 2 for the rest of the battle", (user, target) => {
        const strength = user.getStat("strength");
        const damage = strength * 2;
        target.health -= damage;
        const modifier = new Modifier("strength", -2);
        user.modifiers.push(modifier);

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} unleashes a Raging Strike on ${targetName}, dealing ${colors.red}${damage}${colors.brightBlue} damage but losing ${colors.red}2${colors.brightBlue} strength!${colors.reset}`);
    }),

    "DesperateAttack": new Move("Desperate Attack", "Deals 1.5x the user's strength in damage but costs 5 health", (user, target) => {
        const strength = user.getStat("strength");
        const damage = Math.floor(strength * 1.5);
        target.health -= damage;
        user.health -= 5;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} performs a Desperate Attack on ${targetName}, dealing ${colors.red}${damage}${colors.brightBlue} damage but costing themselves ${colors.red}5${colors.brightBlue} health!${colors.reset}`);
    }),

    "FullForce": new Move("Full Force", "Deals the user's remaining health in damage minus 1 but leaves them with 1 health", (user, target) => {
        const damage = user.health - 1;
        target.health -= damage;
        user.health = 1;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} attacks with Full Force on ${targetName}, dealing ${colors.red}${damage}${colors.brightBlue} damage but leaving themselves with ${colors.red}1${colors.brightBlue} health!${colors.reset}`);
    }),

    "MultiStrike": new Move("Multi Strike", "For every 4 speed the user has (rounded up), they strike the target once dealing 0.5x their strength in damage per hit", (user, target) => {
        const speed = user.getStat("speed");
        const hits = Math.ceil(speed / 4);
        const strength = user.getStat("strength");
        const damagePerHit = Math.floor(strength * 0.5);
        const damage = damagePerHit * hits;
        target.health -= damage;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} performs Multi Strike on ${targetName}, hitting ${hits} times and dealing a total of ${colors.red}${damage}${colors.brightBlue} damage!${colors.reset}`);
    }),

    "Evasion": new Move("Evasion", "Increases the user's speed by 3 for the duration of the battle", (user, target) => {
        const modifier = new Modifier("speed", 3);
        user.modifiers.push(modifier);

        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} uses Evasion, increasing their speed by ${colors.green}3${colors.brightBlue}!${colors.reset}`);
    }, true),

    "Fireball": new Move("Fireball", "Deals 2x the user's magic power in damage. Uses 5 mana", (user, target) => {
        const magicPower = user.getStat("magicPower");
        const damage = magicPower * 2;
        target.health -= damage;
        user.mana -= 5;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} casts Fireball on ${targetName}, dealing ${colors.red}${damage}${colors.brightBlue} damage!${colors.reset}`);
    }, false, (user) => user.mana >= 5),

    "Voltage": new Move("Voltage", "Deals 1.5x the user's magic power in damage and lowers the targets magic power by 1 for the duration of the battle. Uses 4 mana", (user, target) => {
        const magicPower = user.getStat("magicPower");
        const damage = Math.floor(magicPower * 1.5);
        target.health -= damage;
        const modifier = new Modifier("magicPower", -1);
        target.modifiers.push(modifier);
        user.mana -= 4;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} casts Voltage on ${targetName}, dealing ${colors.red}${damage}${colors.brightBlue} damage and reducing their strength by ${colors.red}1${colors.brightBlue}!${colors.reset}`);
    }, false, (user) => user.mana >= 4),

    "ManaDrain": new Move("Mana Drain", "Deals 0.5x the user's strength in damage and removes 3 mana from the target adding it to the user's mana", (user, target) => {
        const strength = user.getStat("strength");
        const damage = Math.floor(strength * 0.5);
        target.health -= damage;
        const manaDrained = Math.min(3, target.mana);
        target.mana -= manaDrained;
        user.mana += manaDrained;

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} casts Mana Drain on ${targetName}, dealing ${colors.red}${damage}${colors.brightBlue} damage and draining ${colors.green}${manaDrained}${colors.brightBlue} mana!${colors.reset}`);
    }),

    "LifeSiphon": new Move("Life Siphon", "Deals 1x the user's strength in damage and heals the user for half the damage dealt, uses 4 mana", (user, target) => {
        const strength = user.getStat("strength");
        const damage = strength;
        target.health -= damage;
        const heal = Math.floor(damage / 2);
        user.health += heal;
        user.health = Math.min(user.health, user.getStat("health"));

        const targetName = colors.yellow + target.name + colors.brightBlue;
        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} casts Life Siphon on ${targetName}, dealing ${colors.red}${damage}${colors.brightBlue} damage and healing for ${colors.green}${heal}${colors.brightBlue} health!${colors.reset}`);
    }, false, (user) => user.mana >= 4),

    "Rejuvenate": new Move("Rejuvenate", "Fully restores the user's health, increases users strength and speed by 2 for the duration of the battle. Removes all mana", (user, target) => {
        user.health = user.getStat("health");
        user.mana = 0;
        const strengthModifier = new Modifier("strength", 2);
        const speedModifier = new Modifier("speed", 2);
        user.modifiers.push(strengthModifier);
        user.modifiers.push(speedModifier);

        const userName = colors.yellow + user.name + colors.brightBlue;

        console.log(`${userName} uses Rejuvenate, fully restoring their health, removing all mana, and increasing their strength and speed by ${colors.green}2${colors.brightBlue}!${colors.reset}`);
    }, true, (user) => user.mana > 0)
}