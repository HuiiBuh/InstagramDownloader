/****************************************************************************************
 * Copyright (c) 2020. HuiiBuh                                                          *
 * This file (StoryDownloader.ts) is part of InstagramDownloader which is released under*
 * GNU LESSER GENERAL PUBLIC LICENSE.                                                   *
 * You are not allowed to use this code or this file for another project without        *
 * linking to the original source AND open sourcing your code.                          *
 ****************************************************************************************/

import { browser } from 'webextension-polyfill-ts';
import { LogClassErrors } from '../decorators';
import { log } from '../functions';
import { DownloadMessage, DownloadType } from '../modles/extension';
import { QuerySelectors } from '../QuerySelectors';
import { extractSrcSet, getStoryAccountName } from './download-functions';
import { Downloader } from './Downloader';

/**
 * Download class which can be used to download stories
 */
@LogClassErrors
export class StoryDownloader extends Downloader {

    /**
     * Download the correct content
     */
    public static async downloadContent(event: MouseEvent | KeyboardEvent): Promise<void> {
        event.stopPropagation();
        event.preventDefault();

        const accountName = await getStoryAccountName(location.href.split("?")[0]);

        const video = document.querySelector('video');
        const img = document.querySelector<HTMLImageElement>(QuerySelectors.storyImage);

        log(video);
        log(img);

        let url: string = '';
        if (video) {
            url = video.currentSrc;
        } else if (img) {
            url = extractSrcSet(img);
        }

        const downloadMessage: DownloadMessage = {
            imageURL: [url],
            accountName,
            type: DownloadType.single,
        };
        await browser.runtime.sendMessage(downloadMessage);
    }

    /**
     * Create a new download button
     */
    public createDownloadButton(): void {
        let closeButton: HTMLElement = document.querySelector(QuerySelectors.storyCloseButton) as HTMLElement;

        // The close button class is different on mobile
        if (!closeButton) closeButton = document.querySelector(QuerySelectors.storyCloseButtonMobile) as HTMLElement;

        // Check if the story has already loaded
        if (!closeButton) return;

        const downloadButton: HTMLElement = document.createElement('span');
        downloadButton.classList.add('story-download-button');

        downloadButton.onclick = StoryDownloader.downloadContent;

        closeButton.appendChild(downloadButton);
    }

    /**
     * Reinitialize the downloader
     */
    public reinitialize(): void {
        this.remove();
        this.init();
    }

    /**
     * Remove the downloader
     */
    public remove(): void {
        super.remove('story-download-button');
    }
}
