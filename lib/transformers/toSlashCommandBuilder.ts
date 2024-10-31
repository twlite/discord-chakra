import { ChakraOption, DecoReturnType } from "../decorators/Command";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

export function transformString(option: ChakraOption, builder: SlashCommandBuilder) {
    builder.addStringOption(opt => 
        opt
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(option.required || false)
    )
}

export function transformUser(option: ChakraOption, builder: SlashCommandBuilder) {
    builder.addUserOption(opt => 
        opt
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(option.required || false)
    )
}

export function transformBool(option: ChakraOption, builder: SlashCommandBuilder) {
    builder.addBooleanOption(opt => 
        opt
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(option.required || false)
    )
}

export function transformToBuilders(commands: DecoReturnType[], map: Map<string, (ctx: ChatInputCommandInteraction) => any>) {
    return commands.map((v) => {
        // this is hacky but it saves some startup time so
        map.set(v.name, v.execute)

        const builder = new SlashCommandBuilder()
            .setName(v.name)
            .setDescription(v.description)

        for (const option of v.options) {
            switch(option.type) {
                case "STRING": {
                    transformString(option, builder)
                    break
                }
                case "BOOLEAN": {
                    transformBool(option, builder)
                    break
                }
                case "USER": {
                    transformUser(option, builder)
                    break;
                }
            }
        }

        return builder
    })
}