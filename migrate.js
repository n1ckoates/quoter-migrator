/*
Copyright (C) 2021 Nicholas Christopher

This file is part of Quoter Migrator.

Quoter Migrator is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3.

Quoter Migrator is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Quoter.  If not, see <https://www.gnu.org/licenses/>.
*/

const quickDB = require("quick.db");
const mongoose = require("mongoose");

const Guild = require("./guild.js");

const { mongoPath } = require("./config.json");

(async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});

	console.log("Connected to mongoDB");
})();

const old = quickDB.all();
let processed = 0;

old.forEach(async (g) => {
	const migratedGuild = {};

	const migratedQuotes = g.data.quotes?.map((q) => {
		const result = {};

		if (q.text) {
			result.text = q.text;
		}

		if (q.author) {
			result.author = q.author;
		}

		if (q.quoter) {
			result.quoterID = q.quoter;
		}

		if (q.editor) {
			result.editorID = q.editor;
		}

		if (q.createdTimestamp) {
			result.createdTimestamp = q.createdTimestamp;
		}

		if (q.editedTimestamp) {
			result.editedTimestamp = q.editedTimestamp;
		}

		if (q.channelID) {
			result.ogChannelID = q.channelID;
		}

		if (q.messageID) {
			result.ogMessageID = q.messageID;
		}

		return result;
	});

	if (g.prefix) {
		migratedGuild.prefix = g.prefix;
	}

	if (g.allQuote) {
		migratedGuild.allQuote = g.allQuote;
	}

	if (g.maxQuotes) {
		migratedGuild.maxGuildQuotes = g.maxQuotes;
	}

	if (g.maxQuoteSize) {
		migratedGuild.maxQuoteLength = g.maxQuoteSize;
	}

	if (migratedQuotes?.length) {
		migratedGuild.quotes = migratedQuotes;
	}

	await Guild.findOneAndUpdate({ _id: g.ID }, migratedGuild, {
		upsert: true,
		new: true,
	});

	processed++;
	console.log(`Migrated guild ${g.ID} (${processed}/${old.length})`);
});
