<template>
  <div class="mt-4 flex">
    <dashboard-card>
      <template #content>
        <div class="px-4 pb-4 text-base text-left">
          <h2 class="text-lg font-bold">yuzuwatch の構成</h2>
          <p>
            柚子を育てる鉢には、土壌水分をモニタリングするセンサーと、生育状態をタイムラプス撮影するためのカメラを装着しています。
            センサーやカメラは Raspberry Pi Zero を介してクラウドに送信しています。センサーデータは MongoDB Atlas
            へ、カメラ画像は Cloudflare R2 へ格納しています。ブラウザで表示するための Web アプリケーションは Netlify
            へデプロイしています。気温と湿度のデータは最寄りのアメダスのデータをお借りしています。
          </p>
          <div class="p-2 flex gap-4 justify-center flex-wrap">
            <img src="~/assets/img/system-overview.jpg" alt="System Overview" class="w-[48%]" />
            <img src="~/assets/img/system-components.jpg" alt="System Components" class="w-[48%]" />
          </div>
          <h2 class="pt-2 text-lg font-bold">ハードウェアの詳細</h2>
          <p>鉢、土、機器ホルダーは近所のダイソーで購入したものです。全く同一のものが手に入る保証はありません。</p>
          <p class="mt-1">Raspberry Pi とセンサー類は以下の通りです。</p>
          <ul class="p-2 list-disc list-inside">
            <li>
              Raspberry Pi Zero WH + ケース (<nuxt-link
                to="https://akizukidenshi.com/catalog/g/g112958/"
                target="_blank"
                class="underline"
                >秋月</nuxt-link
              >)
              <ul class="list-disc ml-10">
                <li>
                  Transcend pSLC SD カード (<nuxt-link to="https://amzn.to/4l7INm9" target="_blank" class="underline"
                    >Amazon</nuxt-link
                  >)
                </li>
                <li>
                  USB AC アダプター Micro B オス 5V3A (<nuxt-link
                    to="https://akizukidenshi.com/catalog/g/g112001/"
                    target="_blank"
                    class="underline"
                    >秋月</nuxt-link
                  >)
                </li>
              </ul>
            </li>
            <li>
              Maker Soil Moisture Sensor (<nuxt-link
                to="https://akizukidenshi.com/catalog/g/g130178/"
                target="_blank"
                class="underline"
                >秋月</nuxt-link
              >)
              <ul class="list-disc ml-10">
                <li>
                  Microchip MCP3002 10bit 2ch AD Converter (<nuxt-link
                    to="https://akizukidenshi.com/catalog/g/g102584/"
                    target="_blank"
                    class="underline"
                    >秋月</nuxt-link
                  >)
                  <ul class="list-disc ml-10">
                    <li>
                      丸ピン IC 用ソケット 1x40 (<nuxt-link
                        to="https://akizukidenshi.com/catalog/g/g101591/"
                        target="_blank"
                        class="underline"
                        >秋月</nuxt-link
                      >)
                    </li>
                  </ul>
                </li>
                <li>
                  Raspberry Pi Zero 用ユニバーサル基板 (<nuxt-link
                    to="https://akizukidenshi.com/catalog/g/g114031/"
                    target="_blank"
                    class="underline"
                    >秋月</nuxt-link
                  >)
                  <ul class="list-disc ml-10">
                    <li>
                      ピンソケット (メス) 2x20 (<nuxt-link
                        to="https://akizukidenshi.com/catalog/g/g100085/"
                        target="_blank"
                        class="underline"
                        >秋月</nuxt-link
                      >)
                    </li>
                    <li>ほか、スズメッキ線、はんだ等</li>
                  </ul>
                </li>
                <li>
                  Seeed Grove コネクター (<nuxt-link to="https://amzn.to/3DYEKYC" target="_blank" class="underline"
                    >Amazon</nuxt-link
                  >)
                  <ul class="list-disc ml-10">
                    <li>ユニバーサル基板に植える際はピッチがちょっと違うので足を少し曲げてやる必要があります。</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Freenove 8MP 120° カメラ (<nuxt-link to="https://amzn.to/4cdqjwc" target="_blank" class="underline"
                >Amazon</nuxt-link
              >)
              <ul class="list-disc ml-10">
                <li>
                  アクリルの台座が目当てで選定しました。Raspberry Pi 純正カメラではないので、利用するには
                  <code>/boot/firmware/config.txt</code> に <code>dtoverlay=imx219</code> を追記する必要があります。
                </li>
              </ul>
            </li>
          </ul>
          <p>Raspberry Pi Zero、MCP3002、Grove の配線は以下の通りです。</p>
          <fwb-table class="py-2 w-fit">
            <fwb-table-head>
              <fwb-table-head-cell>ピン</fwb-table-head-cell>
              <fwb-table-head-cell>RPi Zero</fwb-table-head-cell>
              <fwb-table-head-cell>MCP3002</fwb-table-head-cell>
              <fwb-table-head-cell>Grove</fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>
              <fwb-table-row>
                <fwb-table-cell>3.3V PWR, V<sub>DD</sub>/V<sub>REF</sub></fwb-table-cell>
                <fwb-table-cell>17</fwb-table-cell>
                <fwb-table-cell>8</fwb-table-cell>
                <fwb-table-cell class="!text-left text-red-500">VCC</fwb-table-cell>
              </fwb-table-row>
              <fwb-table-row>
                <fwb-table-cell>SPI MOSI, D<sub>IN</sub></fwb-table-cell>
                <fwb-table-cell>19</fwb-table-cell>
                <fwb-table-cell>5</fwb-table-cell>
                <fwb-table-cell class="!text-left">-</fwb-table-cell>
              </fwb-table-row>
              <fwb-table-row>
                <fwb-table-cell>SPI MISO, D<sub>OUT</sub></fwb-table-cell>
                <fwb-table-cell>21</fwb-table-cell>
                <fwb-table-cell>6</fwb-table-cell>
                <fwb-table-cell class="!text-left">-</fwb-table-cell>
              </fwb-table-row>
              <fwb-table-row>
                <fwb-table-cell>SPI CLK</fwb-table-cell>
                <fwb-table-cell>23</fwb-table-cell>
                <fwb-table-cell>7</fwb-table-cell>
                <fwb-table-cell class="!text-left">-</fwb-table-cell>
              </fwb-table-row>
              <fwb-table-row>
                <fwb-table-cell>SPI CE0, <span class="overline">CS</span>/SHDN</fwb-table-cell>
                <fwb-table-cell>24</fwb-table-cell>
                <fwb-table-cell>1</fwb-table-cell>
                <fwb-table-cell class="!text-left">-</fwb-table-cell>
              </fwb-table-row>
              <fwb-table-row>
                <fwb-table-cell>GND, V<sub>SS</sub></fwb-table-cell>
                <fwb-table-cell>25</fwb-table-cell>
                <fwb-table-cell>4</fwb-table-cell>
                <fwb-table-cell class="!text-left">GND</fwb-table-cell>
              </fwb-table-row>
              <fwb-table-row>
                <fwb-table-cell>CH0</fwb-table-cell>
                <fwb-table-cell>-</fwb-table-cell>
                <fwb-table-cell>2</fwb-table-cell>
                <fwb-table-cell class="!text-left text-yellow-400">OUT</fwb-table-cell>
              </fwb-table-row>
            </fwb-table-body>
          </fwb-table>
          <h2 class="pt-2 text-lg font-bold">ソースコードなど</h2>
          <p>
            Web アプリケーション部分のソースコードは GitHub の
            <nuxt-link to="https://github.com/mikan/yuzuwatch" target="_blank" class="underline">
              mikan/yuzuwatch<!--
            --></nuxt-link>
            で公開しています。フレームワークに Nuxt.js v3 を、デザインライブラリに Flowbite を利用しています。
          </p>
          <p class="mt-1">
            画像を取得しクラウド (Cloudflare R2) にアップロードするプログラムは GitHub の
            <nuxt-link to="https://github.com/mikan/still2cloud" target="_blank" class="underline">
              mikan/still2cloud<!--
            --></nuxt-link>
            で公開しています。実装言語は Go で cron で回して使います。Raspberry Pi
            のカメラ以外にも様々な入力ソースに対応しています。
          </p>
          <p class="mt-1">
            アメダスのデータを Go 言語で簡単に取得するための小さなライブラリを GitHub の
            <nuxt-link to="https://github.com/mikan/go-amedas" target="_blank" class="underline">
              mikan/go-amedas<!--
            --></nuxt-link>
            で公開しています。
          </p>
          <p class="mt-1">
            土壌水分センサーの値を Raspberry Pi で取得するコードはとてもシンプルで、以下のようなものを cron
            で回しています。なお、事前に <code>sudo raspi-config nonint do_i2c 0</code> で SPI
            通信を有効化する必要があります (初回のみ)。
          </p>
          <pre class="p-2 text-sm">
from gpiozero import MCP3002

def main():
    adc = MCP3002()
    voltage = adc.value * 3.3
    upload(voltage)  # 省略

if __name__ == "__main__":
    main()</pre
          >
          <p class="mt-1">バックエンドのソースコードは公開準備中です。</p>
          <h2 class="pt-2 text-lg font-bold">なぜ柚子？</h2>
          <p>
            正月のお雑煮用に柚子を買った際、皮だけ使って捨てるのがなんだかもったいない気がしたので、種子を取って育ててみようと思い立ちました。
            実がなるまで育てるにはとても長い年月が掛かるそうなので育てがいがありそうです。
          </p>
        </div>
      </template>
    </dashboard-card>
  </div>
</template>

<script setup lang="ts">
import { FwbTable, FwbTableBody, FwbTableCell, FwbTableHead, FwbTableHeadCell, FwbTableRow } from "flowbite-vue";
</script>

<style scoped></style>
