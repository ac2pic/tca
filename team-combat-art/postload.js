ig.module("game.feature.team-combat-art").defines(function() {
    sc.PartyMemberEntity.inject({
        preventDefault: false,
        update: function() {
            // take control of party member ai
            // this skips all the member ai logic
            if (!sc.model.isCutscene() && this.preventDefault) {
                
                sc.PlayerBaseEntity.prototype.update.call(this);
            } else {
                this.parent();
            }
        }
    });


    // control when enemies can use shields
    ig.ENTITY.Enemy.inject({
        noShield: false,
        isShielded: function() {
            if (this.noShield) {
                return sc.SHIELD_RESULT.NONE;
            }
            return this.parent(...arguments);
        }
    });

    // control who takes damage
    ig.ENTITY.Combatant.inject({
        noDamage: false,
        onDamage: function() {
            if (this.noDamage) {
                return false;
            }
            return this.parent(...arguments);
        }
    });

    /*
    // make them do nothing
    sc.combat.activeCombatants[sc.COMBATANT_PARTY.ENEMY].map(enemy => enemy.changeState("TEAM_COMBO", true))
    
    // remove all the generic killy stuff
    ig.game.entities.filter((e) => e instanceof sc.CombatProxyEntity).map(e => e.kill())


    // remove all shields
    sc.combat.activeCombatants[sc.COMBATANT_PARTY.ENEMY].map(e => e.noShield = true)

    // restore
    sc.combat.activeCombatants[sc.COMBATANT_PARTY.ENEMY][0].changeState("DEFAULT", true)
    sc.combat.activeCombatants[sc.COMBATANT_PARTY.ENEMY].map(e => e.noShield = false)
    */

    // new state so enemy does nothing
    sc.EnemyType.inject({
        onload: function(data) {
            data.states["TEAM_COMBO"] = {
                choices: []
            };
            this.parent(...arguments);
        }
    });


    // add fake input block
    sc.InputForcer.inject({
        forceDisable: false,
        isBlocking: function() {
            if (this.forceDisable) {
                return true;
            }
            return this.parent();
        }
    });

    sc.TeamCombatArt = ig.Class.extends({

    });
});