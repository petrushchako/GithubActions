#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';

// Dublin
const LATITUDE = 53.3498
const LONGITUDE = -6.2603

async function getWeather() {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;
	try {
		const response = await axios.get(url);
		const current = response.data.current;
		
		// Style output
		console.log(chalk.bold.cyan("=========================================="));
		console.log(chalk.bold.cyan("===========TODAY'S Dublin Weather========="));
		console.log(chalk.bold.cyan("=========================================="));
		console.log(`${chalk.green("Time:")}     ${current.time}`);
		console.log(`${chalk.green("Temperature:")} ${chalk.bold.magenta(current.temperature_2m)} ˚C`);
		console.log(`${chalk.green("Wind Speed:")}  ${current.wind_speed_10m} km/h`);
		console.log(chalk.bold.cyan("=========================================="));
	} catch (error) {
		console.error(chalk.red("Failed to retrieve weather data:"), error.message);
		process.exit(1);
	}
}

getWeather()
