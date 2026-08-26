"use client";

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'


export default defineConfig({
  name: 'default',
  title: 'DriveX Studio',
  projectId: '0r77qhs0',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})