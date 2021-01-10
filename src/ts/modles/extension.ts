/****************************************************************************************
 * Copyright (c) 2020. HuiiBuh                                                          *
 * This file (extension.ts) is part of InstagramDownloader which is released under       *
 * GNU LESSER GENERAL PUBLIC LICENSE.                                                   *
 * You are not allowed to use this code or this file for another project without        *
 * linking to the original source AND open sourcing your code.                          *
 ****************************************************************************************/
import { ShortcodeMedia } from './post';

export interface DownloadMessage {
    imageURL: string[];
    accountName: string;
    timestamp: number;
    type: DownloadType;
}

export enum DownloadType {
    single,
    bulk
}

export interface ContentResponse {
    accountName: string;
    mediaURL: string[];
    original: ShortcodeMedia
}
export type DownloadProgressType = 'download' | 'compression'
export interface DownloadProgress {
    isLast: boolean;
    isFirst: boolean;
    percent: number;
    type: DownloadProgressType;
}

export enum LoggingLevel {
    default = 'log',
    warn = 'warn',
    error = 'error',
}

export interface Metadata {
    percent: number;
    currentFile: string;
}
